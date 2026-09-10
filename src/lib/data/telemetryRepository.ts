/**
 * Telemetría del archivo.
 *
 * Todo el SQL del panel de dirección vive aquí, igual que el del juego vive en
 * `caseRepository` y `progressRepository`: ninguna página escribe consultas.
 *
 * No hay tablas nuevas. El esquema ya registra lo que hace falta como efecto
 * secundario de jugar —`investigation_visits` cuenta repeticiones y fecha la
 * primera y la última, `accusations` archiva cada intento con su veredicto—,
 * así que esto son proyecciones de lectura sobre datos que ya existen.
 */
import { db } from '../db/client';
import { bool, num, str, strOrNull } from './rows';
import type { InvestigationDifficulty, Verdict } from '../domain/types';

// ---------------------------------------------------------------------------
// Resumen general
// ---------------------------------------------------------------------------

export interface ArchiveOverview {
  readers: number;
  investigations: number;
  started: number;
  closed: number;
  accusations: number;
  solvedAccusations: number;
  /** Lectores distintos, no investigaciones: se muestran junto al total de lectores. */
  activeLast7: number;
  newLast7: number;
  cases: number;
  publishedCases: number;
}

export async function archiveOverview(): Promise<ArchiveOverview> {
  const { rows } = await db().execute(`
    SELECT
      (SELECT COUNT(DISTINCT reader_key) FROM investigations)                              AS readers,
      (SELECT COUNT(*) FROM investigations)                                                AS investigations,
      (SELECT COUNT(*) FROM investigations WHERE current_node_id IS NOT NULL)              AS started,
      (SELECT COUNT(*) FROM investigations WHERE status = 'closed')                        AS closed,
      (SELECT COUNT(*) FROM accusations)                                                   AS accusations,
      (SELECT COUNT(*) FROM accusations WHERE verdict = 'solved')                          AS solved,
      -- Ambas se muestran junto al recuento de lectores, así que cuentan
      -- lectores distintos y no investigaciones: un mismo lector con tres
      -- expedientes abiertos es una persona, no tres.
      (SELECT COUNT(DISTINCT reader_key) FROM investigations
        WHERE updated_at >= datetime('now','-7 days'))                                     AS active7,
      (SELECT COUNT(*) FROM (SELECT reader_key FROM investigations
                              GROUP BY reader_key
                             HAVING MIN(started_at) >= datetime('now','-7 days')))         AS new7,
      (SELECT COUNT(*) FROM cases)                                                         AS cases,
      (SELECT COUNT(*) FROM cases WHERE published = 1)                                     AS published
  `);

  const row = rows[0]!;
  return {
    readers: num(row.readers),
    investigations: num(row.investigations),
    started: num(row.started),
    closed: num(row.closed),
    accusations: num(row.accusations),
    solvedAccusations: num(row.solved),
    activeLast7: num(row.active7),
    newLast7: num(row.new7),
    cases: num(row.cases),
    publishedCases: num(row.published),
  };
}

// ---------------------------------------------------------------------------
// Actividad diaria
// ---------------------------------------------------------------------------

export interface DailyActivity {
  day: string;
  investigations: number;
  diligences: number;
}

/**
 * Dos series por día: expedientes abiertos y diligencias nuevas.
 *
 * Se usa `investigation_visits.first_at` y no `last_at` porque la fila se
 * actualiza al releer un nodo: `first_at` fecha el descubrimiento real.
 */
export async function dailyActivity(days = 14): Promise<DailyActivity[]> {
  const since = `-${days - 1} days`;

  const [opened, visited] = await db().batch(
    [
      {
        sql: `SELECT date(started_at) AS day, COUNT(*) AS total
                FROM investigations
               WHERE started_at >= date('now', ?)
               GROUP BY day`,
        args: [since],
      },
      {
        sql: `SELECT date(first_at) AS day, COUNT(*) AS total
                FROM investigation_visits
               WHERE first_at >= date('now', ?)
               GROUP BY day`,
        args: [since],
      },
    ],
    'read',
  );

  const byDay = new Map<string, DailyActivity>();
  const today = new Date();
  for (let offset = days - 1; offset >= 0; offset -= 1) {
    const date = new Date(today);
    date.setUTCDate(date.getUTCDate() - offset);
    const day = date.toISOString().slice(0, 10);
    byDay.set(day, { day, investigations: 0, diligences: 0 });
  }

  for (const row of opened.rows) {
    const entry = byDay.get(str(row.day));
    if (entry) entry.investigations = num(row.total);
  }
  for (const row of visited.rows) {
    const entry = byDay.get(str(row.day));
    if (entry) entry.diligences = num(row.total);
  }

  return [...byDay.values()];
}

// ---------------------------------------------------------------------------
// Expedientes
// ---------------------------------------------------------------------------

export interface CaseTelemetry {
  id: string;
  slug: string;
  fileCode: string;
  title: string;
  published: boolean;
  investigations: number;
  started: number;
  closed: number;
  accusations: number;
  solved: number;
  nodesTotal: number;
  cluesTotal: number;
  avgNodesVisited: number;
  avgMinutesToClose: number | null;
  lastActivity: string | null;
}

/** Incluye los expedientes despublicados: el panel gestiona todo el archivo. */
export async function caseTelemetry(): Promise<CaseTelemetry[]> {
  const { rows } = await db().execute(`
    SELECT c.id, c.slug, c.file_code, c.title, c.published,
           (SELECT COUNT(*) FROM investigations i WHERE i.case_id = c.id)                          AS investigations,
           (SELECT COUNT(*) FROM investigations i WHERE i.case_id = c.id
                                                    AND i.current_node_id IS NOT NULL)             AS started,
           (SELECT COUNT(*) FROM investigations i WHERE i.case_id = c.id AND i.status = 'closed')  AS closed,
           (SELECT COUNT(*) FROM accusations a JOIN investigations i ON i.id = a.investigation_id
             WHERE i.case_id = c.id)                                                               AS accusations,
           (SELECT COUNT(*) FROM accusations a JOIN investigations i ON i.id = a.investigation_id
             WHERE i.case_id = c.id AND a.verdict = 'solved')                                      AS solved,
           (SELECT COUNT(*) FROM case_nodes n WHERE n.case_id = c.id)                              AS nodes_total,
           (SELECT COUNT(*) FROM clues cl WHERE cl.case_id = c.id)                                 AS clues_total,
           (SELECT COALESCE(AVG(v), 0) FROM (
              SELECT COUNT(*) AS v FROM investigation_visits iv
                JOIN investigations i ON i.id = iv.investigation_id
               WHERE i.case_id = c.id GROUP BY iv.investigation_id))                               AS avg_nodes,
           (SELECT AVG((julianday(i.closed_at) - julianday(i.started_at)) * 24 * 60)
              FROM investigations i WHERE i.case_id = c.id AND i.closed_at IS NOT NULL)            AS avg_minutes,
           (SELECT MAX(i.updated_at) FROM investigations i WHERE i.case_id = c.id)                 AS last_activity
      FROM cases c
     ORDER BY c.file_code
  `);

  return rows.map((row) => ({
    id: str(row.id),
    slug: str(row.slug),
    fileCode: str(row.file_code),
    title: str(row.title),
    published: bool(row.published),
    investigations: num(row.investigations),
    started: num(row.started),
    closed: num(row.closed),
    accusations: num(row.accusations),
    solved: num(row.solved),
    nodesTotal: num(row.nodes_total),
    cluesTotal: num(row.clues_total),
    avgNodesVisited: num(row.avg_nodes),
    avgMinutesToClose: row.avg_minutes === null ? null : num(row.avg_minutes),
    lastActivity: strOrNull(row.last_activity),
  }));
}

// ---------------------------------------------------------------------------
// Embudo de diligencias
// ---------------------------------------------------------------------------

export interface NodeReach {
  id: string;
  title: string;
  kind: string;
  isEntry: boolean;
  readers: number;
  visits: number;
  rereaders: number;
}

/**
 * Cuántas investigaciones distintas alcanzaron cada nodo.
 *
 * Un nodo con cero lectores es contenido escrito que nadie ve: o está mal
 * desbloqueado o la acción que lleva a él no se entiende.
 */
export async function nodeReach(caseId: string): Promise<NodeReach[]> {
  const { rows } = await db().execute({
    sql: `SELECT n.id, n.title, n.kind,
                 (c.entry_node_id = n.id) AS is_entry,
                 COUNT(iv.investigation_id)                                        AS readers,
                 COALESCE(SUM(iv.visits), 0)                                       AS visits,
                 COALESCE(SUM(CASE WHEN iv.visits > 1 THEN 1 ELSE 0 END), 0)       AS rereaders
            FROM case_nodes n
            JOIN cases c ON c.id = n.case_id
            LEFT JOIN investigation_visits iv ON iv.node_id = n.id
           WHERE n.case_id = ?
           GROUP BY n.id
           ORDER BY readers DESC, n.title`,
    args: [caseId],
  });

  return rows.map((row) => ({
    id: str(row.id),
    title: str(row.title),
    kind: str(row.kind),
    isEntry: bool(row.is_entry),
    readers: num(row.readers),
    visits: num(row.visits),
    rereaders: num(row.rereaders),
  }));
}

export interface StallPoint {
  nodeId: string;
  title: string;
  readers: number;
  lastActivity: string | null;
}

/** Dónde están paradas ahora mismo las investigaciones sin cerrar. */
export async function stallPoints(caseId: string, limit = 12): Promise<StallPoint[]> {
  const { rows } = await db().execute({
    sql: `SELECT n.id, n.title, COUNT(*) AS readers, MAX(i.updated_at) AS last_activity
            FROM investigations i
            JOIN case_nodes n ON n.id = i.current_node_id
           WHERE i.case_id = ? AND i.status = 'open'
           GROUP BY n.id
           ORDER BY readers DESC, last_activity DESC
           LIMIT ?`,
    args: [caseId, limit],
  });

  return rows.map((row) => ({
    nodeId: str(row.id),
    title: str(row.title),
    readers: num(row.readers),
    lastActivity: strOrNull(row.last_activity),
  }));
}

// ---------------------------------------------------------------------------
// Pistas
// ---------------------------------------------------------------------------

export interface ClueReach {
  id: string;
  name: string;
  kind: string;
  isEvidence: boolean;
  found: number;
  advanced: number;
}

/**
 * Alcance de cada pista y cuántos lectores la hicieron evolucionar más allá
 * de su estado inicial (posición 0 en `clue_states`).
 */
export async function clueReach(caseId: string): Promise<ClueReach[]> {
  const { rows } = await db().execute({
    sql: `SELECT cl.id, cl.name, cl.kind,
                 EXISTS (SELECT 1 FROM solution_evidence se WHERE se.clue_id = cl.id) AS is_evidence,
                 COUNT(ic.investigation_id) AS found,
                 COALESCE(SUM(CASE WHEN ic.state_key <> (
                     SELECT cs.state_key FROM clue_states cs
                      WHERE cs.clue_id = cl.id ORDER BY cs.position LIMIT 1
                   ) THEN 1 ELSE 0 END), 0) AS advanced
            FROM clues cl
            LEFT JOIN investigation_clues ic ON ic.clue_id = cl.id
           WHERE cl.case_id = ?
           GROUP BY cl.id
           ORDER BY found ASC, cl.position`,
    args: [caseId],
  });

  return rows.map((row) => ({
    id: str(row.id),
    name: str(row.name),
    kind: str(row.kind),
    isEvidence: bool(row.is_evidence),
    found: num(row.found),
    advanced: num(row.advanced),
  }));
}

// ---------------------------------------------------------------------------
// Acusaciones
// ---------------------------------------------------------------------------

export interface AccusationBreakdown {
  total: number;
  byVerdict: { verdict: Verdict; total: number }[];
  byCulprit: { id: string; label: string; total: number; correct: boolean }[];
  byMotive: { id: string; label: string; total: number; correct: boolean }[];
  byMethod: { id: string; label: string; total: number; correct: boolean }[];
  byDifficulty: { difficulty: InvestigationDifficulty; total: number; solved: number }[];
  avgEvidenceHits: number | null;
  avgEvidenceRequired: number | null;
}

export async function accusationBreakdown(caseId: string): Promise<AccusationBreakdown> {
  const args = [caseId];
  const [verdicts, culprits, motives, methods, difficulties, averages] = await db().batch(
    [
      {
        sql: `SELECT a.verdict, COUNT(*) AS total
                FROM accusations a JOIN investigations i ON i.id = a.investigation_id
               WHERE i.case_id = ? GROUP BY a.verdict ORDER BY total DESC`,
        args,
      },
      {
        sql: `SELECT a.culprit_suspect_id AS id, s.name AS label, COUNT(*) AS total,
                     (a.culprit_suspect_id = sol.culprit_suspect_id) AS correct
                FROM accusations a
                JOIN investigations i ON i.id = a.investigation_id
                LEFT JOIN suspects s ON s.id = a.culprit_suspect_id
                LEFT JOIN case_solutions sol ON sol.case_id = i.case_id
               WHERE i.case_id = ? GROUP BY a.culprit_suspect_id ORDER BY total DESC`,
        args,
      },
      {
        sql: `SELECT a.motive_option_id AS id, so.label AS label, COUNT(*) AS total,
                     (a.motive_option_id = sol.motive_option_id) AS correct
                FROM accusations a
                JOIN investigations i ON i.id = a.investigation_id
                LEFT JOIN solution_options so ON so.id = a.motive_option_id
                LEFT JOIN case_solutions sol ON sol.case_id = i.case_id
               WHERE i.case_id = ? GROUP BY a.motive_option_id ORDER BY total DESC`,
        args,
      },
      {
        sql: `SELECT a.method_option_id AS id, so.label AS label, COUNT(*) AS total,
                     (a.method_option_id = sol.method_option_id) AS correct
                FROM accusations a
                JOIN investigations i ON i.id = a.investigation_id
                LEFT JOIN solution_options so ON so.id = a.method_option_id
                LEFT JOIN case_solutions sol ON sol.case_id = i.case_id
               WHERE i.case_id = ? GROUP BY a.method_option_id ORDER BY total DESC`,
        args,
      },
      {
        sql: `SELECT a.difficulty, COUNT(*) AS total,
                     SUM(CASE WHEN a.verdict = 'solved' THEN 1 ELSE 0 END) AS solved
                FROM accusations a JOIN investigations i ON i.id = a.investigation_id
               WHERE i.case_id = ? GROUP BY a.difficulty ORDER BY total DESC`,
        args,
      },
      {
        sql: `SELECT COUNT(*) AS total, AVG(a.evidence_hits) AS hits, AVG(a.evidence_required) AS required
                FROM accusations a JOIN investigations i ON i.id = a.investigation_id
               WHERE i.case_id = ?`,
        args,
      },
    ],
    'read',
  );

  const option = (row: (typeof culprits.rows)[number], fallback: string) => ({
    id: strOrNull(row.id) ?? '',
    label: strOrNull(row.label) ?? fallback,
    total: num(row.total),
    correct: bool(row.correct ?? 0),
  });

  const averageRow = averages.rows[0]!;

  return {
    total: num(averageRow.total),
    byVerdict: verdicts.rows.map((row) => ({ verdict: str(row.verdict) as Verdict, total: num(row.total) })),
    byCulprit: culprits.rows.map((row) => option(row, 'Sospechoso desconocido')),
    byMotive: motives.rows.map((row) => option(row, 'Motivo retirado')),
    byMethod: methods.rows.map((row) => option(row, 'Método retirado')),
    byDifficulty: difficulties.rows.map((row) => ({
      difficulty: str(row.difficulty) as InvestigationDifficulty,
      total: num(row.total),
      solved: num(row.solved),
    })),
    avgEvidenceHits: averageRow.hits === null ? null : num(averageRow.hits),
    avgEvidenceRequired: averageRow.required === null ? null : num(averageRow.required),
  };
}

// ---------------------------------------------------------------------------
// Lectores
//
// Hoy no hay cuentas: un "lector" es una cookie anónima (`reader_key`), que es
// exactamente lo que el panel puede mostrar sin inventarse una identidad. La
// columna `investigations.user_id` ya está prevista, así que el día que existan
// cuentas estas consultas agrupan por ella sin rediseñar nada.
// ---------------------------------------------------------------------------

export interface ReaderRow {
  readerKey: string;
  userId: string | null;
  investigations: number;
  started: number;
  closed: number;
  cluesFound: number;
  firstSeen: string | null;
  lastSeen: string | null;
}

export async function listReaders(limit = 100): Promise<ReaderRow[]> {
  const { rows } = await db().execute({
    sql: `SELECT i.reader_key,
                 MAX(i.user_id)                                                    AS user_id,
                 COUNT(*)                                                          AS investigations,
                 SUM(CASE WHEN i.current_node_id IS NOT NULL THEN 1 ELSE 0 END)    AS started,
                 SUM(CASE WHEN i.status = 'closed' THEN 1 ELSE 0 END)              AS closed,
                 (SELECT COUNT(*) FROM investigation_clues ic
                    JOIN investigations i2 ON i2.id = ic.investigation_id
                   WHERE i2.reader_key = i.reader_key)                             AS clues_found,
                 MIN(i.started_at)                                                 AS first_seen,
                 MAX(i.updated_at)                                                 AS last_seen
            FROM investigations i
           GROUP BY i.reader_key
           ORDER BY last_seen DESC
           LIMIT ?`,
    args: [limit],
  });

  return rows.map((row) => ({
    readerKey: str(row.reader_key),
    userId: strOrNull(row.user_id),
    investigations: num(row.investigations),
    started: num(row.started),
    closed: num(row.closed),
    cluesFound: num(row.clues_found),
    firstSeen: strOrNull(row.first_seen),
    lastSeen: strOrNull(row.last_seen),
  }));
}

export interface InvestigationRow {
  id: string;
  readerKey: string;
  caseId: string;
  caseTitle: string;
  caseSlug: string;
  fileCode: string;
  status: string;
  difficulty: InvestigationDifficulty;
  currentTitle: string | null;
  nodesVisited: number;
  nodesTotal: number;
  cluesFound: number;
  cluesTotal: number;
  accusations: number;
  lastVerdict: Verdict | null;
  startedAt: string | null;
  updatedAt: string | null;
}

/** Investigaciones recientes; con `readerKey`, las de un solo lector. */
export async function listInvestigations(options: { readerKey?: string; limit?: number } = {}): Promise<InvestigationRow[]> {
  const { readerKey, limit = 50 } = options;

  const { rows } = await db().execute({
    sql: `SELECT i.id, i.reader_key, i.case_id, i.status, i.difficulty,
                 i.started_at, i.updated_at,
                 c.title AS case_title, c.slug AS case_slug, c.file_code,
                 n.title AS current_title,
                 (SELECT COUNT(*) FROM investigation_visits iv WHERE iv.investigation_id = i.id) AS nodes_visited,
                 (SELECT COUNT(*) FROM case_nodes cn WHERE cn.case_id = i.case_id)               AS nodes_total,
                 (SELECT COUNT(*) FROM investigation_clues ic WHERE ic.investigation_id = i.id)  AS clues_found,
                 (SELECT COUNT(*) FROM clues cl WHERE cl.case_id = i.case_id)                    AS clues_total,
                 (SELECT COUNT(*) FROM accusations a WHERE a.investigation_id = i.id)            AS accusations,
                 (SELECT a.verdict FROM accusations a WHERE a.investigation_id = i.id
                   ORDER BY a.created_at DESC, a.rowid DESC LIMIT 1)                             AS last_verdict
            FROM investigations i
            JOIN cases c ON c.id = i.case_id
            LEFT JOIN case_nodes n ON n.id = i.current_node_id
           WHERE (? IS NULL OR i.reader_key = ?)
           ORDER BY i.updated_at DESC
           LIMIT ?`,
    args: [readerKey ?? null, readerKey ?? null, limit],
  });

  return rows.map((row) => ({
    id: str(row.id),
    readerKey: str(row.reader_key),
    caseId: str(row.case_id),
    caseTitle: str(row.case_title),
    caseSlug: str(row.case_slug),
    fileCode: str(row.file_code),
    status: str(row.status),
    difficulty: str(row.difficulty) as InvestigationDifficulty,
    currentTitle: strOrNull(row.current_title),
    nodesVisited: num(row.nodes_visited),
    nodesTotal: num(row.nodes_total),
    cluesFound: num(row.clues_found),
    cluesTotal: num(row.clues_total),
    accusations: num(row.accusations),
    lastVerdict: strOrNull(row.last_verdict) as Verdict | null,
    startedAt: strOrNull(row.started_at),
    updatedAt: strOrNull(row.updated_at),
  }));
}

// ---------------------------------------------------------------------------
// Gestión
// ---------------------------------------------------------------------------

/**
 * Publica o retira un expediente. Retirarlo lo saca de la portada sin tocar el
 * contenido ni las investigaciones en curso: es el interruptor para una beta.
 */
export async function setCasePublished(caseId: string, published: boolean): Promise<void> {
  await db().execute({
    sql: `UPDATE cases SET published = ? WHERE id = ?`,
    args: [published ? 1 : 0, caseId],
  });
}

/** Borra una investigación. Las tablas de progreso caen por `ON DELETE CASCADE`. */
export async function deleteInvestigation(investigationId: string): Promise<void> {
  await db().execute({
    sql: `DELETE FROM investigations WHERE id = ?`,
    args: [investigationId],
  });
}

/** Borra todo el rastro de un lector: sus investigaciones y su progreso. */
export async function deleteReader(readerKey: string): Promise<number> {
  const result = await db().execute({
    sql: `DELETE FROM investigations WHERE reader_key = ?`,
    args: [readerKey],
  });
  return Number(result.rowsAffected ?? 0);
}

// ---------------------------------------------------------------------------
// Exportación
// ---------------------------------------------------------------------------

/** Volcado plano para analizar fuera del panel (hoja de cálculo, cuaderno...). */
export async function exportTelemetry(): Promise<Record<string, unknown>> {
  const [investigations, accusations, visits] = await db().batch(
    [
      {
        sql: `SELECT i.id, i.case_id, c.slug AS case_slug, i.reader_key, i.status, i.difficulty,
                     i.current_node_id, i.started_at, i.updated_at, i.closed_at
                FROM investigations i JOIN cases c ON c.id = i.case_id
               ORDER BY i.started_at`,
        args: [],
      },
      {
        sql: `SELECT a.*, c.slug AS case_slug
                FROM accusations a
                JOIN investigations i ON i.id = a.investigation_id
                JOIN cases c ON c.id = i.case_id
               ORDER BY a.created_at`,
        args: [],
      },
      {
        sql: `SELECT iv.investigation_id, iv.node_id, n.title AS node_title, c.slug AS case_slug,
                     iv.visits, iv.first_at, iv.last_at
                FROM investigation_visits iv
                JOIN case_nodes n ON n.id = iv.node_id
                JOIN cases c ON c.id = n.case_id
               ORDER BY iv.first_at`,
        args: [],
      },
    ],
    'read',
  );

  return {
    exportedAt: new Date().toISOString(),
    investigations: investigations.rows,
    accusations: accusations.rows,
    visits: visits.rows,
  };
}
