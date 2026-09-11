/**
 * Vuelca una definición de expediente en Turso.
 *
 * El script no interpreta el contenido: recorre la definición y la escribe.
 * Es el mismo camino que seguirá el generador por IA cuando exista.
 *
 *   pnpm db:seed
 */
import { mkdir } from 'node:fs/promises';
import type { InStatement } from '@libsql/client';
import { scriptClient } from './turso.ts';
import type { CaseDefinition } from '../db/seeds/definition.ts';
import { case001 } from '../db/seeds/case-001-la-ultima-campanada.ts';
import { case002 } from '../db/seeds/case-002-la-senal-bajo-el-hielo.ts';
import { case003 } from '../db/seeds/case-003-la-puja-de-humo.ts';
import { case004 } from '../db/seeds/case-004-noventa-segundos-de-sombra.ts';
import { case005 } from '../db/seeds/case-005-ocho-minutos-bajo-tierra.ts';

export const CASES: CaseDefinition[] = [case001, case002, case003, case004, case005];

function statementsFor(def: CaseDefinition): InStatement[] {
  const statements: InStatement[] = [];

  // Las tablas que el progreso no referencia se reescriben enteras: es la forma
  // más simple de que la definición sea la fuente de verdad. Que las opciones
  // desbloqueadas se deriven (y no se guarden) es lo que lo hace posible.
  for (const table of [
    'case_evidence_rules',
    'solution_evidence',
    'case_solutions',
    'solution_options',
    'option_requirements',
    'node_options',
    'node_effects',
    'clue_states',
  ]) {
    statements.push({ sql: `DELETE FROM ${table} WHERE case_id = ?`, args: [def.id] });
  }

  // Nodos, pistas, sospechosos y hechos SÍ los referencia el progreso: se
  // actualizan en su sitio para no borrar investigaciones en curso al reeditar
  // el texto. Sólo desaparece lo que la definición ya no contiene.
  const survivors: Array<[string, string[]]> = [
    ['case_nodes', def.nodes.map((node) => node.id)],
    ['clues', def.clues.map((clue) => clue.id)],
    ['suspects', def.suspects.map((suspect) => suspect.id)],
    ['suspect_facts', def.suspects.flatMap((suspect) => suspect.facts.map((fact) => fact.id))],
  ];
  for (const [table, ids] of survivors) {
    const holes = ids.map(() => '?').join(', ');
    statements.push({
      sql: `DELETE FROM ${table} WHERE case_id = ? AND id NOT IN (${holes || "''"})`,
      args: [def.id, ...ids],
    });
  }

  statements.push({
    sql: `INSERT INTO cases (
            id, slug, file_code, title, subtitle, place, date_label,
            victim_name, briefing, cover_public_id, entry_node_id, published
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
          ON CONFLICT (id) DO UPDATE SET
            slug = excluded.slug, file_code = excluded.file_code, title = excluded.title,
            subtitle = excluded.subtitle, place = excluded.place, date_label = excluded.date_label,
            victim_name = excluded.victim_name, briefing = excluded.briefing,
            cover_public_id = excluded.cover_public_id, entry_node_id = excluded.entry_node_id,
            published = 1`,
    args: [
      def.id,
      def.slug,
      def.fileCode,
      def.title,
      def.subtitle ?? null,
      def.place ?? null,
      def.dateLabel ?? null,
      def.victimName ?? null,
      def.briefing,
      def.coverPublicId ?? null,
      def.entryNodeId,
    ],
  });

  def.suspects.forEach((suspect, index) => {
    statements.push({
      sql: `INSERT INTO suspects (id, case_id, name, role, portrait_public_id, description, relation, visible_after_node_id, position)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT (id) DO UPDATE SET
              case_id = excluded.case_id, name = excluded.name, role = excluded.role,
              portrait_public_id = excluded.portrait_public_id, description = excluded.description,
              relation = excluded.relation, visible_after_node_id = excluded.visible_after_node_id,
              position = excluded.position`,
      args: [
        suspect.id,
        def.id,
        suspect.name,
        suspect.role,
        suspect.portraitPublicId ?? null,
        suspect.description,
        suspect.relation ?? null,
        suspect.visibleAfterNodeId ?? null,
        index,
      ],
    });

    suspect.facts.forEach((fact, factIndex) => {
      statements.push({
        sql: `INSERT INTO suspect_facts (id, case_id, suspect_id, kind, headline, detail, position)
              VALUES (?, ?, ?, ?, ?, ?, ?)
              ON CONFLICT (id) DO UPDATE SET
                case_id = excluded.case_id, suspect_id = excluded.suspect_id, kind = excluded.kind,
                headline = excluded.headline, detail = excluded.detail, position = excluded.position`,
        args: [fact.id, def.id, suspect.id, fact.kind, fact.headline, fact.detail, factIndex],
      });
    });
  });

  def.clues.forEach((clue, index) => {
    statements.push({
      sql: `INSERT INTO clues (id, case_id, name, kind, image_public_id, found_at, position)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT (id) DO UPDATE SET
              case_id = excluded.case_id, name = excluded.name, kind = excluded.kind,
              image_public_id = excluded.image_public_id, found_at = excluded.found_at,
              position = excluded.position`,
      args: [clue.id, def.id, clue.name, clue.kind, clue.imagePublicId ?? null, clue.foundAt ?? null, index],
    });

    clue.states.forEach((state, stateIndex) => {
      statements.push({
        sql: `INSERT INTO clue_states (id, case_id, clue_id, state_key, label, description, position)
              VALUES (?, ?, ?, ?, ?, ?, ?)`,
        args: [
          `${clue.id}--${state.key}`,
          def.id,
          clue.id,
          state.key,
          state.label,
          state.description,
          stateIndex,
        ],
      });
    });
  });

  for (const node of def.nodes) {
    statements.push({
      sql: `INSERT INTO case_nodes (id, case_id, kind, title, location, body, image_public_id, image_caption)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT (id) DO UPDATE SET
              case_id = excluded.case_id, kind = excluded.kind, title = excluded.title,
              location = excluded.location, body = excluded.body,
              image_public_id = excluded.image_public_id, image_caption = excluded.image_caption`,
      args: [
        node.id,
        def.id,
        node.kind,
        node.title,
        node.location ?? null,
        node.body,
        node.imagePublicId ?? null,
        node.imageCaption ?? null,
      ],
    });

    (node.effects ?? []).forEach((effect, index) => {
      statements.push({
        sql: `INSERT INTO node_effects (id, case_id, node_id, effect, target_id, value, position)
              VALUES (?, ?, ?, ?, ?, ?, ?)`,
        args: [
          `${node.id}--fx${index}`,
          def.id,
          node.id,
          effect.effect,
          effect.target,
          'value' in effect ? (effect.value ?? null) : null,
          index,
        ],
      });
    });
  }

  def.options.forEach((option, index) => {
    statements.push({
      sql: `INSERT INTO node_options (id, case_id, source_node_id, target_node_id, label, hint, line, repeatable, position)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        option.id,
        def.id,
        option.from ?? null,
        option.to,
        option.label,
        option.hint ?? null,
        option.line ?? null,
        option.repeatable ? 1 : 0,
        index,
      ],
    });

    (option.requires ?? []).forEach((requirement, reqIndex) => {
      statements.push({
        sql: `INSERT INTO option_requirements (id, case_id, option_id, requirement, target_id, value)
              VALUES (?, ?, ?, ?, ?, ?)`,
        args: [
          `${option.id}--req${reqIndex}`,
          def.id,
          option.id,
          requirement.requirement,
          requirement.target,
          'value' in requirement ? (requirement.value ?? null) : null,
        ],
      });
    });
  });

  [...def.motives.map((choice) => ['motive', choice] as const),
   ...def.methods.map((choice) => ['method', choice] as const)]
    .forEach(([dimension, choice], index) => {
      statements.push({
        sql: `INSERT INTO solution_options (id, case_id, dimension, label, position)
              VALUES (?, ?, ?, ?, ?)`,
        args: [choice.id, def.id, dimension, choice.label, index],
      });
    });

  statements.push({
    sql: `INSERT INTO case_solutions (case_id, culprit_suspect_id, motive_option_id, method_option_id, explanation, epitaph)
          VALUES (?, ?, ?, ?, ?, ?)`,
    args: [
      def.id,
      def.solution.culprit,
      def.solution.motive,
      def.solution.method,
      def.solution.explanation,
      def.solution.epitaph ?? null,
    ],
  });

  for (const clueId of def.solution.evidence) {
    statements.push({
      sql: `INSERT INTO solution_evidence (case_id, clue_id) VALUES (?, ?)`,
      args: [def.id, clueId],
    });
  }

  statements.push({
    sql: 'INSERT INTO case_evidence_rules (case_id, groups_json) VALUES (?, ?)',
    args: [def.id, JSON.stringify({
      groups: def.solution.evidenceGroups,
      accusationRequirements: def.solution.accusationRequirements ?? [],
    })],
  });
  return statements;
}

/** Comprobaciones de integridad antes de escribir: un caso roto no debe llegar a Turso. */
function validate(def: CaseDefinition): string[] {
  const errors: string[] = [];
  const nodeIds = new Set(def.nodes.map((node) => node.id));
  const clueIds = new Set(def.clues.map((clue) => clue.id));
  const factIds = new Set(def.suspects.flatMap((suspect) => suspect.facts.map((fact) => fact.id)));
  const suspectIds = new Set(def.suspects.map((suspect) => suspect.id));
  const choiceIds = new Set([...def.motives, ...def.methods].map((choice) => choice.id));

  if (!nodeIds.has(def.entryNodeId)) errors.push(`entryNodeId desconocido: ${def.entryNodeId}`);

  for (const node of def.nodes) {
    for (const effect of node.effects ?? []) {
      if (effect.effect === 'reveal_fact' && !factIds.has(effect.target)) {
        errors.push(`${node.id}: hecho desconocido ${effect.target}`);
      }
      if (
        (effect.effect === 'discover_clue' || effect.effect === 'advance_clue') &&
        !clueIds.has(effect.target)
      ) {
        errors.push(`${node.id}: pista desconocida ${effect.target}`);
      }
      if (effect.effect === 'advance_clue') {
        const clue = def.clues.find((candidate) => candidate.id === effect.target);
        if (clue && !clue.states.some((state) => state.key === effect.value)) {
          errors.push(`${node.id}: la pista ${effect.target} no tiene el estado "${effect.value}"`);
        }
      }
    }
  }

  for (const option of def.options) {
    if (!nodeIds.has(option.to)) errors.push(`${option.id}: destino desconocido ${option.to}`);
    if (option.from && !nodeIds.has(option.from)) {
      errors.push(`${option.id}: origen desconocido ${option.from}`);
    }
    for (const requirement of option.requires ?? []) {
      const known =
        (requirement.requirement === 'clue' || requirement.requirement === 'clue_state'
          ? clueIds
          : requirement.requirement === 'fact'
            ? factIds
            : requirement.requirement === 'node'
              ? nodeIds
              : null) ?? null;
      if (known && !known.has(requirement.target)) {
        errors.push(`${option.id}: requisito desconocido ${requirement.target}`);
      }
    }
  }

  // Simular desbloqueos acumulativos, incluyendo requisitos, no sólo enlaces entrantes.
  const reachable = new Set<string>();
  const knownClues = new Map<string, string>();
  const knownFacts = new Set<string>();
  const knownFlags = new Map<string, string>();
  const apply = (id: string) => {
    reachable.add(id);
    for (const e of def.nodes.find((n) => n.id === id)?.effects ?? []) {
      if (e.effect === 'discover_clue' && !knownClues.has(e.target)) {
        const initial = def.clues.find((c) => c.id === e.target)?.states[0]?.key;
        if (initial) knownClues.set(e.target, initial);
      }
      if (e.effect === 'advance_clue') knownClues.set(e.target, e.value);
      if (e.effect === 'reveal_fact') knownFacts.add(e.target);
      if (e.effect === 'set_flag') knownFlags.set(e.target, e.value ?? '1');
    }
  };
  apply(def.entryNodeId);
  let changed = true;
  while (changed) {
    changed = false;
    for (const option of def.options) {
      if (reachable.has(option.to) || (option.from && !reachable.has(option.from))) continue;
      const available = (option.requires ?? []).every((r) => {
        switch (r.requirement) {
          case 'node': return reachable.has(r.target);
          case 'clue': return knownClues.has(r.target);
          case 'clue_state': return knownClues.get(r.target) === r.value;
          case 'fact': return knownFacts.has(r.target);
          case 'flag': return r.value === undefined ? knownFlags.has(r.target) : knownFlags.get(r.target) === r.value;
        }
      });
      if (available) { apply(option.to); changed = true; }
    }
  }
  for (const id of nodeIds) {
    if (!reachable.has(id)) errors.push(`nodo inalcanzable por sus requisitos: ${id}`);
  }

  // Y todo lo que puede descubrirse debe poder descubrirse: un hecho o una pista
  // que ningún nodo revela es contenido muerto dentro del expediente.
  const produced = new Set(
    def.nodes.flatMap((node) => (node.effects ?? []).map((effect) => effect.target)),
  );
  for (const id of clueIds) if (!produced.has(id)) errors.push(`pista inalcanzable: ${id}`);
  for (const id of factIds) if (!produced.has(id)) errors.push(`hecho inalcanzable: ${id}`);

  if (!suspectIds.has(def.solution.culprit)) errors.push('la solución apunta a un sospechoso inexistente');
  if (!choiceIds.has(def.solution.motive)) errors.push('motivo de la solución inexistente');
  if (!choiceIds.has(def.solution.method)) errors.push('método de la solución inexistente');
  for (const clueId of def.solution.evidence) {
    if (!clueIds.has(clueId)) errors.push(`evidencia de la solución inexistente: ${clueId}`);
  }

  if (!def.solution.evidenceGroups.length) errors.push('faltan grupos de evidencia');
  if (!def.solution.evidenceGroups.some((group) => group.importance === 'essential')) {
    errors.push('falta al menos un grupo de evidencia esencial');
  }
  for (const group of def.solution.evidenceGroups) {
    if (group.importance !== 'essential' && group.importance !== 'complementary') {
      errors.push(`importancia no definida en el grupo de evidencia: ${group.label}`);
    }
    if (!group.alternatives.length) errors.push(`grupo vacío: ${group.label}`);
    for (const alternative of group.alternatives) {
      const clue = def.clues.find((c) => c.id === alternative.clueId);
      if (!clue?.states.some((s) => s.key === alternative.stateKey)) {
        errors.push(`evidencia o estado inválido: ${alternative.clueId}/${alternative.stateKey}`);
      }
      if (!def.solution.evidence.includes(alternative.clueId)) errors.push(`evidencia no puntuable: ${alternative.clueId}`);
    }
  }
  for (const requirement of def.solution.accusationRequirements ?? []) {
    const known =
      (requirement.requirement === 'clue' || requirement.requirement === 'clue_state'
        ? clueIds
        : requirement.requirement === 'fact'
          ? factIds
          : requirement.requirement === 'node'
            ? nodeIds
            : null) ?? null;
    if (known && !known.has(requirement.target)) {
      errors.push(`requisito de acusación desconocido: ${requirement.target}`);
    }
  }
  return errors;
}

await mkdir(new URL('../.data/', import.meta.url), { recursive: true });
const client = scriptClient();

for (const def of CASES) {
  const errors = validate(def);
  if (errors.length > 0) {
    console.error(`✗ ${def.slug} no supera la validación:`);
    for (const error of errors) console.error(`  · ${error}`);
    process.exitCode = 1;
    continue;
  }

  await client.batch(statementsFor(def), 'write');
  console.log(
    `✓ ${def.fileCode} ${def.title}: ${def.nodes.length} nodos, ${def.options.length} acciones, ` +
      `${def.clues.length} evidencias, ${def.suspects.length} sospechosos.`,
  );
}

client.close();
