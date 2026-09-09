/**
 * Modelo de dominio.
 *
 * Es lo que entiende el motor de investigación. No es el esquema de la base de
 * datos (eso vive en `db/schema.sql` y se mapea en `src/lib/data/`) ni lo que
 * consume la interfaz (eso es `src/lib/presentation/`).
 */

// ---------------------------------------------------------------------------
// Definición del expediente
// ---------------------------------------------------------------------------

export type ClueKind = 'essential' | 'secondary' | 'red_herring' | 'context';

export type FactKind = 'testimony' | 'alibi' | 'contradiction' | 'motive' | 'background';

export type NodeKind = 'intro' | 'scene' | 'interrogation' | 'analysis';

export interface ClueState {
  key: string;
  label: string;
  description: string;
}

export interface Clue {
  id: string;
  name: string;
  kind: ClueKind;
  imagePublicId: string | null;
  foundAt: string | null;
  /** Ordenados: el primero es el estado con el que se descubre la pista. */
  states: ClueState[];
}

export interface SuspectFact {
  id: string;
  suspectId: string;
  kind: FactKind;
  headline: string;
  detail: string;
}

export interface Suspect {
  id: string;
  name: string;
  role: string;
  portraitPublicId: string | null;
  description: string;
  relation: string | null;
  facts: SuspectFact[];
}

export type EffectType = 'discover_clue' | 'advance_clue' | 'reveal_fact' | 'set_flag';

export interface NodeEffect {
  effect: EffectType;
  targetId: string;
  value: string | null;
}

export interface CaseNode {
  id: string;
  kind: NodeKind;
  title: string;
  location: string | null;
  /** Párrafos ya separados. */
  body: string[];
  imagePublicId: string | null;
  imageCaption: string | null;
  effects: NodeEffect[];
}

export type RequirementType = 'clue' | 'clue_state' | 'fact' | 'node' | 'flag';

export interface OptionRequirement {
  requirement: RequirementType;
  targetId: string;
  value: string | null;
}

export interface InvestigationOption {
  id: string;
  /** null → disponible desde cualquier punto del expediente. */
  sourceNodeId: string | null;
  targetNodeId: string;
  label: string;
  hint: string | null;
  /** Línea de investigación que agrupa la acción. */
  line: string | null;
  repeatable: boolean;
  requirements: OptionRequirement[];
}

export type SolutionDimension = 'motive' | 'method';

export interface SolutionOption {
  id: string;
  dimension: SolutionDimension;
  label: string;
}

export interface CaseSolution {
  culpritSuspectId: string;
  motiveOptionId: string;
  methodOptionId: string;
  explanation: string;
  epitaph: string | null;
  evidenceClueIds: string[];
}

/** Agregado completo de la definición de un expediente. */
export interface CaseFile {
  id: string;
  slug: string;
  fileCode: string;
  title: string;
  subtitle: string | null;
  place: string | null;
  dateLabel: string | null;
  victimName: string | null;
  briefing: string;
  coverPublicId: string | null;
  entryNodeId: string;
  nodes: Record<string, CaseNode>;
  options: InvestigationOption[];
  suspects: Suspect[];
  clues: Clue[];
  solutionOptions: SolutionOption[];
  solution: CaseSolution;
}

/** Ficha reducida para el listado del archivo. */
export interface CaseSummary {
  slug: string;
  fileCode: string;
  title: string;
  subtitle: string | null;
  place: string | null;
  dateLabel: string | null;
  briefing: string;
  coverPublicId: string | null;
}

// ---------------------------------------------------------------------------
// Estado de la investigación
// ---------------------------------------------------------------------------

export type InvestigationStatus = 'open' | 'closed';

export interface InvestigationState {
  id: string;
  caseId: string;
  status: InvestigationStatus;
  currentNodeId: string | null;
  visitedNodeIds: ReadonlySet<string>;
  /** clueId → estado vigente de esa pista. Única fuente de verdad. */
  clueStates: ReadonlyMap<string, string>;
  discoveredFactIds: ReadonlySet<string>;
  flags: ReadonlyMap<string, string>;
}

export type Verdict = 'solved' | 'partial' | 'failed';

export interface Accusation {
  culpritSuspectId: string;
  motiveOptionId: string;
  methodOptionId: string;
  evidenceClueIds: string[];
}

export interface AccusationResult {
  culpritCorrect: boolean;
  motiveCorrect: boolean;
  methodCorrect: boolean;
  evidenceHits: number;
  evidenceTotal: number;
  verdict: Verdict;
}

export interface RecordedAccusation extends Accusation, AccusationResult {
  id: string;
  createdAt: string;
}
