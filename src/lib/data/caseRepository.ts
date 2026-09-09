/**
 * Lectura de la definición de un expediente desde Turso.
 *
 * Es la única capa que escribe SQL sobre el contenido editorial. Devuelve
 * modelos de dominio; ni las páginas ni los componentes ven una fila jamás.
 */
import { db } from '../db/client';
import { bool, groupBy, num, paragraphs, str, strOrNull } from './rows';
import type {
  CaseFile,
  CaseNode,
  CaseSummary,
  Clue,
  ClueKind,
  ClueState,
  FactKind,
  InvestigationOption,
  NodeEffect,
  NodeKind,
  OptionRequirement,
  RequirementType,
  SolutionDimension,
  SolutionOption,
  Suspect,
  SuspectFact,
  EffectType,
} from '../domain/types';

export async function listPublishedCases(): Promise<CaseSummary[]> {
  const { rows } = await db().execute(
    `SELECT slug, file_code, title, subtitle, place, date_label, briefing, cover_public_id
       FROM cases
      WHERE published = 1
      ORDER BY file_code`,
  );

  return rows.map((row) => ({
    slug: str(row.slug),
    fileCode: str(row.file_code),
    title: str(row.title),
    subtitle: strOrNull(row.subtitle),
    place: strOrNull(row.place),
    dateLabel: strOrNull(row.date_label),
    briefing: str(row.briefing),
    coverPublicId: strOrNull(row.cover_public_id),
  }));
}

/**
 * Carga el expediente completo. Es una lectura por caso, no por nodo: el
 * expediente es pequeño y compacto, y así la pantalla se pinta de una vez.
 */
export async function getCaseFile(slug: string): Promise<CaseFile | null> {
  const client = db();

  const caseRow = (
    await client.execute({
      sql: `SELECT * FROM cases WHERE slug = ? AND published = 1`,
      args: [slug],
    })
  ).rows[0];

  if (!caseRow) return null;
  const caseId = str(caseRow.id);
  const args = [caseId];

  const [
    suspects,
    facts,
    clues,
    clueStates,
    nodes,
    effects,
    options,
    requirements,
    solutionOptions,
    solution,
    evidence,
    evidenceRules,
  ] = await client.batch(
    [
      { sql: `SELECT * FROM suspects WHERE case_id = ? ORDER BY position, name`, args },
      { sql: `SELECT * FROM suspect_facts WHERE case_id = ? ORDER BY position`, args },
      { sql: `SELECT * FROM clues WHERE case_id = ? ORDER BY position, name`, args },
      { sql: `SELECT * FROM clue_states WHERE case_id = ? ORDER BY position`, args },
      { sql: `SELECT * FROM case_nodes WHERE case_id = ?`, args },
      { sql: `SELECT * FROM node_effects WHERE case_id = ? ORDER BY position`, args },
      { sql: `SELECT * FROM node_options WHERE case_id = ? ORDER BY position`, args },
      { sql: `SELECT * FROM option_requirements WHERE case_id = ?`, args },
      { sql: `SELECT * FROM solution_options WHERE case_id = ? ORDER BY dimension, position`, args },
      { sql: `SELECT * FROM case_solutions WHERE case_id = ?`, args },
      { sql: `SELECT clue_id FROM solution_evidence WHERE case_id = ?`, args },
      { sql: `SELECT groups_json FROM case_evidence_rules WHERE case_id = ?`, args },
    ],
    'read',
  );

  const solutionRow = solution.rows[0];
  if (!solutionRow) {
    throw new Error(`El expediente "${slug}" no tiene solución registrada.`);
  }

  const factsBySuspect = groupBy(
    facts.rows,
    (row) => str(row.suspect_id),
    (row): SuspectFact => ({
      id: str(row.id),
      suspectId: str(row.suspect_id),
      kind: str(row.kind) as FactKind,
      headline: str(row.headline),
      detail: str(row.detail),
    }),
  );

  const statesByClue = groupBy(
    clueStates.rows,
    (row) => str(row.clue_id),
    (row): ClueState => ({
      key: str(row.state_key),
      label: str(row.label),
      description: str(row.description),
    }),
  );

  const effectsByNode = groupBy(
    effects.rows,
    (row) => str(row.node_id),
    (row): NodeEffect => ({
      effect: str(row.effect) as EffectType,
      targetId: str(row.target_id),
      value: strOrNull(row.value),
    }),
  );

  const requirementsByOption = groupBy(
    requirements.rows,
    (row) => str(row.option_id),
    (row): OptionRequirement => ({
      requirement: str(row.requirement) as RequirementType,
      targetId: str(row.target_id),
      value: strOrNull(row.value),
    }),
  );

  const suspectList: Suspect[] = suspects.rows.map((row) => {
    const id = str(row.id);
    return {
      id,
      name: str(row.name),
      role: str(row.role),
      portraitPublicId: strOrNull(row.portrait_public_id),
      description: str(row.description),
      relation: strOrNull(row.relation),
      facts: factsBySuspect.get(id) ?? [],
    };
  });

  const clueList: Clue[] = clues.rows.map((row) => {
    const id = str(row.id);
    return {
      id,
      name: str(row.name),
      kind: str(row.kind) as ClueKind,
      imagePublicId: strOrNull(row.image_public_id),
      foundAt: strOrNull(row.found_at),
      states: statesByClue.get(id) ?? [],
    };
  });

  const nodeMap: Record<string, CaseNode> = {};
  for (const row of nodes.rows) {
    const id = str(row.id);
    nodeMap[id] = {
      id,
      kind: str(row.kind) as NodeKind,
      title: str(row.title),
      location: strOrNull(row.location),
      body: paragraphs(str(row.body)),
      imagePublicId: strOrNull(row.image_public_id),
      imageCaption: strOrNull(row.image_caption),
      effects: effectsByNode.get(id) ?? [],
    };
  }

  const optionList: InvestigationOption[] = options.rows.map((row) => {
    const id = str(row.id);
    return {
      id,
      sourceNodeId: strOrNull(row.source_node_id),
      targetNodeId: str(row.target_node_id),
      label: str(row.label),
      hint: strOrNull(row.hint),
      line: strOrNull(row.line),
      repeatable: bool(row.repeatable),
      requirements: requirementsByOption.get(id) ?? [],
    };
  });

  const solutionOptionList: SolutionOption[] = solutionOptions.rows.map((row) => ({
    id: str(row.id),
    dimension: str(row.dimension) as SolutionDimension,
    label: str(row.label),
  }));

  return {
    id: caseId,
    slug: str(caseRow.slug),
    fileCode: str(caseRow.file_code),
    title: str(caseRow.title),
    subtitle: strOrNull(caseRow.subtitle),
    place: strOrNull(caseRow.place),
    dateLabel: strOrNull(caseRow.date_label),
    victimName: strOrNull(caseRow.victim_name),
    briefing: str(caseRow.briefing),
    coverPublicId: strOrNull(caseRow.cover_public_id),
    entryNodeId: str(caseRow.entry_node_id),
    nodes: nodeMap,
    options: optionList,
    suspects: suspectList,
    clues: clueList,
    solutionOptions: solutionOptionList,
    solution: {
      culpritSuspectId: str(solutionRow.culprit_suspect_id),
      motiveOptionId: str(solutionRow.motive_option_id),
      methodOptionId: str(solutionRow.method_option_id),
      explanation: str(solutionRow.explanation),
      epitaph: strOrNull(solutionRow.epitaph),
      evidenceClueIds: evidence.rows.map((row) => str(row.clue_id)),
      evidenceGroups: JSON.parse(str(evidenceRules.rows[0]?.groups_json ?? '[]')),
    },
  };
}

/** Comprobación barata de existencia de contenido, para diagnósticos. */
export async function countCases(): Promise<number> {
  const { rows } = await db().execute(`SELECT COUNT(*) AS total FROM cases`);
  return rows[0] ? num(rows[0].total) : 0;
}
