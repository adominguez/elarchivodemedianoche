/**
 * Progreso de una investigación en Turso.
 *
 * El estado del lector vive aquí y sólo aquí. El frontend no guarda progreso:
 * cada acción se persiste y la pantalla se vuelve a derivar de la base de datos.
 */
import { randomUUID } from 'node:crypto';
import type { InStatement } from '@libsql/client';
import { db } from '../db/client';
import { num, str, strOrNull } from './rows';
import type {
  Accusation,
  AccusationResult,
  InvestigationState,
  InvestigationDifficulty,
  InvestigationStatus,
  RecordedAccusation,
} from '../domain/types';
import type { StateChanges } from '../domain/engine';

/**
 * Recupera la investigación abierta de este lector para el caso, o la crea.
 * `readerKey` es hoy una cookie anónima; el día que existan cuentas, se
 * rellenará además `user_id` sin tocar el resto del modelo.
 */
export async function findOrStartInvestigation(
  caseId: string,
  readerKey: string,
): Promise<string> {
  const client = db();

  const existing = await client.execute({
    sql: `SELECT id FROM investigations WHERE case_id = ? AND reader_key = ?`,
    args: [caseId, readerKey],
  });
  if (existing.rows[0]) return str(existing.rows[0].id);

  const id = randomUUID();
  await client.execute({
    sql: `INSERT INTO investigations (id, case_id, reader_key) VALUES (?, ?, ?)
          ON CONFLICT (case_id, reader_key) DO NOTHING`,
    args: [id, caseId, readerKey],
  });

  // Si dos peticiones simultáneas abrieron el mismo expediente, gana la primera.
  const settled = await client.execute({
    sql: `SELECT id FROM investigations WHERE case_id = ? AND reader_key = ?`,
    args: [caseId, readerKey],
  });
  return str(settled.rows[0]!.id);
}

export async function loadState(investigationId: string): Promise<InvestigationState> {
  const client = db();
  const args = [investigationId];

  const [head, visits, clues, facts, flags] = await client.batch(
    [
      { sql: `SELECT id, case_id, status, difficulty, current_node_id FROM investigations WHERE id = ?`, args },
      { sql: `SELECT node_id FROM investigation_visits WHERE investigation_id = ?`, args },
      { sql: `SELECT clue_id, state_key FROM investigation_clues WHERE investigation_id = ?`, args },
      { sql: `SELECT fact_id FROM investigation_facts WHERE investigation_id = ?`, args },
      { sql: `SELECT flag, value FROM investigation_flags WHERE investigation_id = ?`, args },
    ],
    'read',
  );

  const headRow = head.rows[0];
  if (!headRow) throw new Error(`Investigación desconocida: ${investigationId}`);

  return {
    id: str(headRow.id),
    caseId: str(headRow.case_id),
    status: str(headRow.status) as InvestigationStatus,
    difficulty: str(headRow.difficulty) as InvestigationDifficulty,
    currentNodeId: strOrNull(headRow.current_node_id),
    visitedNodeIds: new Set(visits.rows.map((row) => str(row.node_id))),
    clueStates: new Map(clues.rows.map((row) => [str(row.clue_id), str(row.state_key)])),
    discoveredFactIds: new Set(facts.rows.map((row) => str(row.fact_id))),
    flags: new Map(flags.rows.map((row) => [str(row.flag), str(row.value)])),
  };
}

export async function setDifficulty(investigationId: string, difficulty: InvestigationDifficulty): Promise<void> {
  await db().execute({
    sql: `UPDATE investigations SET difficulty = ?, updated_at = datetime('now') WHERE id = ? AND status = 'open'`,
    args: [difficulty, investigationId],
  });
}

/**
 * Persiste el delta que devuelve el motor tras visitar un nodo.
 * Se escribe sólo lo que ha cambiado, en una única transacción.
 */
export async function persistVisit(
  investigationId: string,
  nodeId: string,
  changes: StateChanges,
): Promise<void> {
  const statements: InStatement[] = [
    {
      sql: `INSERT INTO investigation_visits (investigation_id, node_id)
            VALUES (?, ?)
            ON CONFLICT (investigation_id, node_id)
            DO UPDATE SET visits = visits + 1, last_at = datetime('now')`,
      args: [investigationId, nodeId],
    },
    {
      sql: `UPDATE investigations
               SET current_node_id = ?, updated_at = datetime('now')
             WHERE id = ?`,
      args: [nodeId, investigationId],
    },
  ];

  // El motor ya resolvió el estado exacto de cada pista: aquí sólo se guarda.
  for (const { clueId, stateKey } of [...changes.discoveredClues, ...changes.advancedClues]) {
    statements.push({
      sql: `INSERT INTO investigation_clues (investigation_id, clue_id, state_key)
            VALUES (?, ?, ?)
            ON CONFLICT (investigation_id, clue_id)
            DO UPDATE SET state_key = excluded.state_key, updated_at = datetime('now')`,
      args: [investigationId, clueId, stateKey],
    });
  }

  for (const factId of changes.revealedFactIds) {
    statements.push({
      sql: `INSERT INTO investigation_facts (investigation_id, fact_id) VALUES (?, ?)
            ON CONFLICT (investigation_id, fact_id) DO NOTHING`,
      args: [investigationId, factId],
    });
  }

  for (const { flag, value } of changes.flags) {
    statements.push({
      sql: `INSERT INTO investigation_flags (investigation_id, flag, value) VALUES (?, ?, ?)
            ON CONFLICT (investigation_id, flag) DO UPDATE SET value = excluded.value`,
      args: [investigationId, flag, value],
    });
  }

  await db().batch(statements, 'write');
}

export async function recordAccusation(
  investigationId: string,
  accusation: Accusation,
  result: AccusationResult,
): Promise<void> {
  const id = randomUUID();

  await db().batch(
    [
      {
        sql: `INSERT INTO accusations (
                id, investigation_id, culprit_suspect_id, motive_option_id, method_option_id,
                evidence_ids, culprit_correct, motive_correct, method_correct,
                evidence_hits, evidence_total, evidence_required, difficulty, verdict
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          id,
          investigationId,
          accusation.culpritSuspectId,
          accusation.motiveOptionId,
          accusation.methodOptionId,
          JSON.stringify(accusation.evidenceClueIds),
          result.culpritCorrect ? 1 : 0,
          result.motiveCorrect ? 1 : 0,
          result.methodCorrect ? 1 : 0,
          result.evidenceHits,
          result.evidenceTotal,
          result.evidenceRequired,
          result.difficulty,
          result.verdict,
        ],
      },
      {
        sql: `UPDATE investigations
                 SET status = ?, closed_at = datetime('now'), updated_at = datetime('now')
               WHERE id = ?`,
        args: [result.verdict === 'solved' ? 'closed' : 'open', investigationId],
      },
    ],
    'write',
  );
}

export async function lastAccusation(investigationId: string): Promise<RecordedAccusation | null> {
  const { rows } = await db().execute({
    sql: `SELECT * FROM accusations WHERE investigation_id = ? ORDER BY created_at DESC, rowid DESC LIMIT 1`,
    args: [investigationId],
  });

  const row = rows[0];
  if (!row) return null;

  let evidenceClueIds: string[] = [];
  try {
    const parsed: unknown = JSON.parse(str(row.evidence_ids));
    if (Array.isArray(parsed)) evidenceClueIds = parsed.filter((id): id is string => typeof id === 'string');
  } catch {
    evidenceClueIds = [];
  }

  return {
    id: str(row.id),
    createdAt: str(row.created_at),
    culpritSuspectId: str(row.culprit_suspect_id),
    motiveOptionId: str(row.motive_option_id),
    methodOptionId: str(row.method_option_id),
    evidenceClueIds,
    culpritCorrect: num(row.culprit_correct) !== 0,
    motiveCorrect: num(row.motive_correct) !== 0,
    methodCorrect: num(row.method_correct) !== 0,
    evidenceHits: num(row.evidence_hits),
    evidenceTotal: num(row.evidence_total),
    evidenceRequired: num(row.evidence_required),
    difficulty: str(row.difficulty) as InvestigationDifficulty,
    verdict: str(row.verdict) as RecordedAccusation['verdict'],
  };
}

/** Vuelve a abrir el expediente desde cero (misma investigación, sin hallazgos). */
export async function reopenInvestigation(investigationId: string): Promise<void> {
  const args = [investigationId];
  await db().batch(
    [
      { sql: `DELETE FROM investigation_visits WHERE investigation_id = ?`, args },
      { sql: `DELETE FROM investigation_clues  WHERE investigation_id = ?`, args },
      { sql: `DELETE FROM investigation_facts  WHERE investigation_id = ?`, args },
      { sql: `DELETE FROM investigation_flags  WHERE investigation_id = ?`, args },
      { sql: `DELETE FROM accusations          WHERE investigation_id = ?`, args },
      {
        sql: `UPDATE investigations
                 SET status = 'open', current_node_id = NULL, closed_at = NULL,
                     started_at = datetime('now'), updated_at = datetime('now')
               WHERE id = ?`,
        args,
      },
    ],
    'write',
  );
}
