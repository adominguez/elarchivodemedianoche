/**
 * Motor de investigación.
 *
 * Funciones puras: reciben la definición del expediente y el estado de la
 * investigación, y devuelven un estado nuevo o una lectura derivada. No sabe
 * nada de Turso, de Cloudinary ni de la interfaz.
 */
import type {
  Accusation,
  AccusationResult,
  CaseFile,
  CaseNode,
  InvestigationOption,
  InvestigationState,
  OptionRequirement,
  Verdict,
} from './types';

// ---------------------------------------------------------------------------
// Requisitos y disponibilidad
// ---------------------------------------------------------------------------

export function isRequirementMet(req: OptionRequirement, state: InvestigationState): boolean {
  switch (req.requirement) {
    case 'clue':
      return state.clueStates.has(req.targetId);
    case 'clue_state':
      return state.clueStates.get(req.targetId) === req.value;
    case 'fact':
      return state.discoveredFactIds.has(req.targetId);
    case 'node':
      return state.visitedNodeIds.has(req.targetId);
    case 'flag':
      return req.value === null
        ? state.flags.has(req.targetId)
        : state.flags.get(req.targetId) === req.value;
    default:
      return false;
  }
}

export function areRequirementsMet(option: InvestigationOption, state: InvestigationState): boolean {
  return option.requirements.every((req) => isRequirementMet(req, state));
}

export type OptionStatus =
  /** Disponible desde el principio y aún sin recorrer. */
  | 'available'
  /** Se ha abierto gracias a un descubrimiento previo. */
  | 'unlocked'
  /** Ya recorrida (se puede releer). */
  | 'completed';

export interface EvaluatedOption {
  option: InvestigationOption;
  status: OptionStatus;
}

function evaluate(option: InvestigationOption, state: InvestigationState): EvaluatedOption {
  const visited = state.visitedNodeIds.has(option.targetNodeId);
  if (visited && !option.repeatable) return { option, status: 'completed' };
  return { option, status: option.requirements.length > 0 ? 'unlocked' : 'available' };
}

/**
 * Acciones abiertas en todo el expediente (investigación no excluyente):
 * elegir una línea nunca cierra las demás.
 */
export function openInvestigations(caseFile: CaseFile, state: InvestigationState): EvaluatedOption[] {
  return caseFile.options
    .filter((option) => option.sourceNodeId === null && areRequirementsMet(option, state))
    .map((option) => evaluate(option, state));
}

/** Continuaciones inmediatas del nodo que se está leyendo. */
export function nodeContinuations(
  caseFile: CaseFile,
  state: InvestigationState,
  nodeId: string | null,
): EvaluatedOption[] {
  if (!nodeId) return [];
  return caseFile.options
    .filter((option) => option.sourceNodeId === nodeId && areRequirementsMet(option, state))
    .map((option) => evaluate(option, state));
}

/** ¿Puede el lector recorrer ahora mismo esta acción? Valida la petición entrante. */
export function canFollow(
  caseFile: CaseFile,
  state: InvestigationState,
  optionId: string,
): InvestigationOption | null {
  const option = caseFile.options.find((candidate) => candidate.id === optionId);
  if (!option) return null;
  if (!areRequirementsMet(option, state)) return null;
  if (option.sourceNodeId !== null && option.sourceNodeId !== state.currentNodeId) return null;
  return option;
}

export function canAccuse(caseFile: CaseFile, state: InvestigationState): boolean {
  return caseFile.solution.accusationRequirements.every((requirement) =>
    isRequirementMet(requirement, state),
  );
}

// ---------------------------------------------------------------------------
// Visitar un nodo
// ---------------------------------------------------------------------------

/** Delta producido por una visita: lo que se persiste y lo que se anuncia al lector. */
export interface ClueChange {
  clueId: string;
  stateKey: string;
}

export interface StateChanges {
  nodeFirstVisit: boolean;
  /** Pistas que el lector no conocía. */
  discoveredClues: ClueChange[];
  /** Pistas ya conocidas que han evolucionado. */
  advancedClues: ClueChange[];
  revealedFactIds: string[];
  flags: Array<{ flag: string; value: string }>;
}

export interface VisitResult {
  state: InvestigationState;
  changes: StateChanges;
}

function initialStateKey(caseFile: CaseFile, clueId: string): string | null {
  const clue = caseFile.clues.find((candidate) => candidate.id === clueId);
  return clue?.states[0]?.key ?? null;
}

/**
 * Aplica los efectos de un nodo sobre el estado. Es idempotente: releer un
 * nodo no vuelve a "descubrir" lo que ya se conocía.
 */
export function visitNode(caseFile: CaseFile, state: InvestigationState, nodeId: string): VisitResult {
  const node: CaseNode | undefined = caseFile.nodes[nodeId];
  if (!node) throw new Error(`Nodo desconocido: ${nodeId}`);

  const clueStates = new Map(state.clueStates);
  const facts = new Set(state.discoveredFactIds);
  const flags = new Map(state.flags);

  const changes: StateChanges = {
    nodeFirstVisit: !state.visitedNodeIds.has(nodeId),
    discoveredClues: [],
    advancedClues: [],
    revealedFactIds: [],
    flags: [],
  };

  for (const effect of node.effects) {
    switch (effect.effect) {
      case 'discover_clue': {
        if (clueStates.has(effect.targetId)) break;
        const stateKey = effect.value ?? initialStateKey(caseFile, effect.targetId);
        if (!stateKey) break;
        clueStates.set(effect.targetId, stateKey);
        changes.discoveredClues.push({ clueId: effect.targetId, stateKey });
        break;
      }
      case 'advance_clue': {
        if (!effect.value) break;
        // Sólo avanza una pista ya descubierta; si no lo estaba, se descubre ya evolucionada.
        const known = clueStates.get(effect.targetId);
        const states = caseFile.clues.find((clue) => clue.id === effect.targetId)?.states ?? [];
        const nextIndex = states.findIndex((s) => s.key === effect.value);
        const currentIndex = states.findIndex((s) => s.key === known);
        if (nextIndex < 0 || currentIndex >= nextIndex) break;
        clueStates.set(effect.targetId, effect.value);
        const change = { clueId: effect.targetId, stateKey: effect.value };
        if (known === undefined) changes.discoveredClues.push(change);
        else changes.advancedClues.push(change);
        break;
      }
      case 'reveal_fact': {
        if (facts.has(effect.targetId)) break;
        facts.add(effect.targetId);
        changes.revealedFactIds.push(effect.targetId);
        break;
      }
      case 'set_flag': {
        const value = effect.value ?? '1';
        if (flags.get(effect.targetId) === value) break;
        flags.set(effect.targetId, value);
        changes.flags.push({ flag: effect.targetId, value });
        break;
      }
    }
  }

  const visited = new Set(state.visitedNodeIds);
  visited.add(nodeId);

  return {
    state: {
      ...state,
      currentNodeId: nodeId,
      visitedNodeIds: visited,
      clueStates,
      discoveredFactIds: facts,
      flags,
    },
    changes,
  };
}

// ---------------------------------------------------------------------------
// Progreso
// ---------------------------------------------------------------------------

export interface CaseProgress {
  cluesFound: number;
  cluesTotal: number;
  factsFound: number;
  factsTotal: number;
  nodesVisited: number;
  nodesTotal: number;
  /** Avance aproximado de la investigación, 0-100. */
  percent: number;
}

export function caseProgress(caseFile: CaseFile, state: InvestigationState): CaseProgress {
  const cluesTotal = caseFile.clues.length;
  const factsTotal = caseFile.suspects.reduce((total, suspect) => total + suspect.facts.length, 0);
  const nodesTotal = Object.keys(caseFile.nodes).length;

  const cluesFound = countKnown(state.clueStates.keys(), caseFile.clues.map((clue) => clue.id));
  const factsFound = countKnown(
    state.discoveredFactIds.values(),
    caseFile.suspects.flatMap((suspect) => suspect.facts.map((fact) => fact.id)),
  );
  const nodesVisited = countKnown(state.visitedNodeIds.values(), Object.keys(caseFile.nodes));

  const found = cluesFound + factsFound + nodesVisited;
  const total = cluesTotal + factsTotal + nodesTotal;

  return {
    cluesFound,
    cluesTotal,
    factsFound,
    factsTotal,
    nodesVisited,
    nodesTotal,
    percent: total === 0 ? 0 : Math.round((found / total) * 100),
  };
}

function countKnown(known: IterableIterator<string>, universe: string[]): number {
  const valid = new Set(universe);
  let count = 0;
  for (const id of known) if (valid.has(id)) count += 1;
  return count;
}

// ---------------------------------------------------------------------------
// Acusación
// ---------------------------------------------------------------------------

export function judgeAccusation(caseFile: CaseFile, accusation: Accusation, state: InvestigationState): AccusationResult {
  const { solution } = caseFile;

  const culpritCorrect = accusation.culpritSuspectId === solution.culpritSuspectId;
  const motiveCorrect = accusation.motiveOptionId === solution.motiveOptionId;
  const methodCorrect = accusation.methodOptionId === solution.methodOptionId;

  const key = new Set(solution.evidenceClueIds);
  // Sólo se puntúan pruebas realmente descubiertas, aunque se invoque el motor directamente.
  const selected = new Set(accusation.evidenceClueIds.filter((id) => state.clueStates.has(id)));
  const satisfiedGroups = solution.evidenceGroups.filter((group) =>
    group.alternatives.some(({ clueId, stateKey }) => {
      if (!selected.has(clueId)) return false;
      const states = caseFile.clues.find((clue) => clue.id === clueId)?.states ?? [];
      const required = states.findIndex((s) => s.key === stateKey);
      const current = states.findIndex((s) => s.key === state.clueStates.get(clueId));
      return required >= 0 && current >= required;
    }),
  );
  const supported = solution.evidenceGroups.length > 0 &&
    satisfiedGroups.length === solution.evidenceGroups.length &&
    [...selected].every((id) => key.has(id));
  const evidenceHits = satisfiedGroups.length;

  let verdict: Verdict;
  if (culpritCorrect && motiveCorrect && methodCorrect && supported) verdict = 'solved';
  else if (culpritCorrect || motiveCorrect || methodCorrect) verdict = 'partial';
  else verdict = 'failed';

  return {
    culpritCorrect,
    motiveCorrect,
    methodCorrect,
    evidenceHits,
    evidenceTotal: solution.evidenceGroups.length,
    verdict,
  };
}
