/**
 * Modelos de presentación.
 *
 * Traducen dominio + progreso + Cloudinary a exactamente lo que la interfaz
 * necesita pintar. Gracias a esta capa los componentes no consultan el estado
 * ni saben cómo se construye una URL de imagen.
 */
import {
  canAccuse,
  caseProgress,
  nodeContinuations,
  openInvestigations,
  requiredEvidenceGroups,
  type CaseProgress,
  type EvaluatedOption,
  type OptionStatus,
  type StateChanges,
} from '../domain/engine';
import { caseImage, type CaseImage } from '../images/cloudinary';
import type {
  AccusationResult,
  CaseFile,
  CaseNode,
  CaseSummary,
  Clue,
  ClueKind,
  FactKind,
  InvestigationState,
  InvestigationDifficulty,
  RecordedAccusation,
  Suspect,
} from '../domain/types';

// ---------------------------------------------------------------------------
// Escena
// ---------------------------------------------------------------------------

export interface SceneView {
  id: string;
  title: string;
  location: string | null;
  paragraphs: string[];
  image: CaseImage | null;
  imageCaption: string | null;
}

const SCENE_SIZES = '(min-width: 1024px) 42rem, 100vw';

export function sceneView(node: CaseNode): SceneView {
  return {
    id: node.id,
    title: node.title,
    location: node.location,
    paragraphs: node.body,
    image: caseImage(node.imagePublicId, 'scene', SCENE_SIZES),
    imageCaption: node.imageCaption,
  };
}

// ---------------------------------------------------------------------------
// Anotaciones de lo recién descubierto
// ---------------------------------------------------------------------------

export interface DiscoveryNotice {
  tone: 'clue' | 'update' | 'fact';
  label: string;
  title: string;
  detail: string;
}

const FACT_LABEL: Record<FactKind, string> = {
  testimony: 'Declaración',
  alibi: 'Comprobación',
  contradiction: 'Dato contrastado',
  motive: 'Antecedente',
  background: 'Contexto',
};

export function discoveryNotices(caseFile: CaseFile, changes: StateChanges): DiscoveryNotice[] {
  const notices: DiscoveryNotice[] = [];

  for (const { clueId, stateKey } of changes.discoveredClues) {
    const clue = caseFile.clues.find((candidate) => candidate.id === clueId);
    if (!clue) continue;
    const state = clue.states.find((candidate) => candidate.key === stateKey) ?? clue.states[0];
    notices.push({
      tone: 'clue',
      label: 'Nueva evidencia',
      title: clue.name,
      detail: state?.description ?? '',
    });
  }

  for (const { clueId, stateKey } of changes.advancedClues) {
    const clue = caseFile.clues.find((candidate) => candidate.id === clueId);
    const state = clue?.states.find((candidate) => candidate.key === stateKey);
    if (!clue || !state) continue;
    notices.push({
      tone: 'update',
      label: 'Evidencia actualizada',
      title: state.label,
      detail: state.description,
    });
  }

  for (const factId of changes.revealedFactIds) {
    for (const suspect of caseFile.suspects) {
      const fact = suspect.facts.find((candidate) => candidate.id === factId);
      if (!fact) continue;
      notices.push({
        tone: 'fact',
        label: `${FACT_LABEL[fact.kind]} · ${suspect.name}`,
        title: fact.headline,
        detail: fact.detail,
      });
    }
  }

  return notices;
}

// ---------------------------------------------------------------------------
// Sospechosos
// ---------------------------------------------------------------------------

export interface SuspectBadge {
  kind: FactKind;
  label: string;
}

export interface SuspectFactView {
  kind: FactKind;
  kindLabel: string;
  headline: string;
  detail: string;
}

export interface SuspectCard {
  id: string;
  name: string;
  role: string;
  description: string;
  relation: string | null;
  initials: string;
  portrait: CaseImage | null;
  thumb: CaseImage | null;
  badges: SuspectBadge[];
  facts: SuspectFactView[];
  factsKnown: number;
  factsTotal: number;
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join('');
}

/**
 * Muestra hechos objetivos. Nunca concluye por el lector: no marca culpables
 * ni traduce una contradicción en una acusación.
 */
export function suspectCard(suspect: Suspect, state: InvestigationState): SuspectCard {
  const known = suspect.facts.filter((fact) => state.discoveredFactIds.has(fact.id));

  const badges: SuspectBadge[] = [];
  for (const fact of known) {
    if (badges.some((badge) => badge.kind === fact.kind)) continue;
    if (fact.kind === 'testimony' || fact.kind === 'background') continue;
    badges.push({ kind: fact.kind, label: FACT_LABEL[fact.kind] });
  }

  return {
    id: suspect.id,
    name: suspect.name,
    role: suspect.role,
    description: suspect.description,
    relation: suspect.relation,
    initials: initials(suspect.name),
    portrait: caseImage(suspect.portraitPublicId, 'portrait', '(min-width: 768px) 12rem, 40vw'),
    thumb: caseImage(suspect.portraitPublicId, 'portraitThumb', '4rem'),
    badges,
    facts: known.map((fact) => ({
      kind: fact.kind,
      kindLabel: FACT_LABEL[fact.kind],
      headline: fact.headline,
      detail: fact.detail,
    })),
    factsKnown: known.length,
    factsTotal: suspect.facts.length,
  };
}

// ---------------------------------------------------------------------------
// Evidencias
// ---------------------------------------------------------------------------

export const CLUE_KIND_LABEL: Record<ClueKind, string> = {
  essential: 'Prueba',
  secondary: 'Indicio',
  red_herring: 'Indicio',
  context: 'Contexto',
};

export interface KnownClueView {
  known: true;
  id: string;
  name: string;
  /** Título vigente de la pista: puede haber evolucionado. */
  stateLabel: string;
  description: string;
  foundAt: string | null;
  kindLabel: string;
  evolved: boolean;
  thumb: CaseImage | null;
  detail: CaseImage | null;
}

export interface UnknownClueView {
  known: false;
  slot: number;
}

export type ClueSlotView = KnownClueView | UnknownClueView;

export function knownClue(clue: Clue, stateKey: string): KnownClueView {
  const index = clue.states.findIndex((candidate) => candidate.key === stateKey);
  const state = clue.states[index] ?? clue.states[0];

  return {
    known: true,
    id: clue.id,
    name: clue.name,
    stateLabel: state?.label ?? clue.name,
    description: state?.description ?? '',
    foundAt: clue.foundAt,
    // El tipo de una pista falsa no se revela: se presenta como un indicio más.
    kindLabel: CLUE_KIND_LABEL[clue.kind],
    evolved: index > 0,
    thumb: caseImage(clue.imagePublicId, 'clueThumb', '(min-width: 768px) 7rem, 22vw'),
    detail: caseImage(clue.imagePublicId, 'clueDetail', '(min-width: 768px) 28rem, 90vw'),
  };
}

/** Rejilla de evidencias: lo hallado, y tantas incógnitas como falten. */
export function evidenceBoard(caseFile: CaseFile, state: InvestigationState): ClueSlotView[] {
  const slots: ClueSlotView[] = [];

  for (const clue of caseFile.clues) {
    const stateKey = state.clueStates.get(clue.id);
    if (stateKey) slots.push(knownClue(clue, stateKey));
  }

  const missing = caseFile.clues.length - slots.length;
  for (let index = 0; index < missing; index += 1) {
    slots.push({ known: false, slot: slots.length + index + 1 });
  }

  return slots;
}

// ---------------------------------------------------------------------------
// Acciones de investigación
// ---------------------------------------------------------------------------

export interface OptionView {
  id: string;
  label: string;
  hint: string | null;
  status: OptionStatus;
}

export interface OptionGroup {
  line: string;
  options: OptionView[];
}

function toOptionView({ option, status }: EvaluatedOption): OptionView {
  return { id: option.id, label: option.label, hint: option.hint, status };
}

const UNGROUPED = 'Otras diligencias';

function groupOptions(evaluated: EvaluatedOption[]): OptionGroup[] {
  const groups: OptionGroup[] = [];

  for (const entry of evaluated) {
    const line = entry.option.line ?? UNGROUPED;
    let group = groups.find((candidate) => candidate.line === line);
    if (!group) {
      group = { line, options: [] };
      groups.push(group);
    }
    group.options.push(toOptionView(entry));
  }

  return groups;
}

// ---------------------------------------------------------------------------
// Vista completa del expediente
// ---------------------------------------------------------------------------

export interface CaseHeaderView {
  fileCode: string;
  title: string;
  subtitle: string | null;
  place: string | null;
  dateLabel: string | null;
  victimName: string | null;
  briefing: string;
  cover: CaseImage | null;
  banner: CaseImage | null;
}

export interface AccusationChoiceView {
  id: string;
  label: string;
}

export interface AccusationFormView {
  suspects: Array<{ id: string; name: string; role: string; thumbSrc: string | null; initials: string }>;
  motives: AccusationChoiceView[];
  methods: AccusationChoiceView[];
  evidence: Array<{ id: string; label: string }>;
  difficulty: InvestigationDifficulty;
  difficultyLabel: string;
  evidenceRequired: number;
  evidenceGroupsTotal: number;
}

export interface VerdictLineView {
  label: string;
  value: string;
  correct: boolean;
}

export interface VerdictView {
  verdict: RecordedAccusation['verdict'];
  headline: string;
  lines: VerdictLineView[];
  evidenceHits: number;
  evidenceTotal: number;
  evidenceRequired: number;
  difficultyLabel: string;
  explanation: string | null;
  epitaph: string | null;
  progress: CaseProgress;
}

export interface DossierView {
  header: CaseHeaderView;
  scene: SceneView | null;
  notices: DiscoveryNotice[];
  continuations: OptionView[];
  investigationLines: OptionGroup[];
  suspects: SuspectCard[];
  evidence: ClueSlotView[];
  progress: CaseProgress;
  accusationForm: AccusationFormView;
  canAccuse: boolean;
  verdict: VerdictView | null;
  closed: boolean;
  difficulty: InvestigationDifficulty;
  difficultyLabel: string;
}

const DIFFICULTY_LABEL: Record<InvestigationDifficulty, string> = {
  narrative: 'Narrativo',
  detective: 'Detective',
  hound: 'Sabueso',
};

export function caseHeader(caseFile: CaseFile): CaseHeaderView {
  return {
    fileCode: caseFile.fileCode,
    title: caseFile.title,
    subtitle: caseFile.subtitle,
    place: caseFile.place,
    dateLabel: caseFile.dateLabel,
    victimName: caseFile.victimName,
    briefing: caseFile.briefing,
    cover: caseImage(caseFile.coverPublicId, 'caseCover', '(min-width: 768px) 20rem, 60vw'),
    banner: caseImage(caseFile.coverPublicId, 'caseBanner', '100vw'),
  };
}

export function caseSummaryCover(summary: CaseSummary): CaseImage | null {
  return caseImage(summary.coverPublicId, 'caseCover', '(min-width: 768px) 18rem, 70vw');
}

function accusationForm(caseFile: CaseFile, state: InvestigationState): AccusationFormView {
  return {
    suspects: caseFile.suspects.map((suspect) => ({
      id: suspect.id,
      name: suspect.name,
      role: suspect.role,
      thumbSrc: caseImage(suspect.portraitPublicId, 'portraitThumb')?.src ?? null,
      initials: initials(suspect.name),
    })),
    motives: caseFile.solutionOptions
      .filter((option) => option.dimension === 'motive')
      .map(({ id, label }) => ({ id, label })),
    methods: caseFile.solutionOptions
      .filter((option) => option.dimension === 'method')
      .map(({ id, label }) => ({ id, label })),
    // Sólo se puede acusar con lo que se ha encontrado.
    evidence: caseFile.clues
      .filter((clue) => state.clueStates.has(clue.id))
      .map((clue) => ({
        id: clue.id,
        label: knownClue(clue, state.clueStates.get(clue.id)!).stateLabel,
      })),
    difficulty: state.difficulty,
    difficultyLabel: DIFFICULTY_LABEL[state.difficulty],
    evidenceRequired: requiredEvidenceGroups(caseFile, state.difficulty),
    evidenceGroupsTotal: caseFile.solution.evidenceGroups.length,
  };
}

const VERDICT_HEADLINE: Record<RecordedAccusation['verdict'], string> = {
  solved: 'Expediente resuelto',
  partial: 'Acusación no acreditada',
  failed: 'Acusación no acreditada',
};

export function verdictView(
  caseFile: CaseFile,
  state: InvestigationState,
  accusation: RecordedAccusation,
): VerdictView {
  const suspect = caseFile.suspects.find((candidate) => candidate.id === accusation.culpritSuspectId);
  const motive = caseFile.solutionOptions.find((option) => option.id === accusation.motiveOptionId);
  const method = caseFile.solutionOptions.find((option) => option.id === accusation.methodOptionId);
  const solved = accusation.verdict === 'solved';

  return {
    verdict: accusation.verdict,
    headline: VERDICT_HEADLINE[accusation.verdict],
    lines: [
      { label: 'Culpable', value: suspect?.name ?? '—', correct: accusation.culpritCorrect },
      { label: 'Motivo', value: motive?.label ?? '—', correct: accusation.motiveCorrect },
      { label: 'Método', value: method?.label ?? '—', correct: accusation.methodCorrect },
    ],
    evidenceHits: accusation.evidenceHits,
    evidenceTotal: accusation.evidenceTotal,
    evidenceRequired: accusation.evidenceRequired || requiredEvidenceGroups(caseFile, accusation.difficulty),
    difficultyLabel: DIFFICULTY_LABEL[accusation.difficulty],
    // La verdad completa sólo se revela cuando el caso queda cerrado.
    explanation: solved ? caseFile.solution.explanation : null,
    epitaph: solved ? caseFile.solution.epitaph : null,
    progress: caseProgress(caseFile, state),
  };
}

export interface BuildDossierInput {
  caseFile: CaseFile;
  state: InvestigationState;
  changes?: StateChanges;
  accusation?: RecordedAccusation | null;
}

export function buildDossier({
  caseFile,
  state,
  changes,
  accusation,
}: BuildDossierInput): DossierView {
  const node = state.currentNodeId ? caseFile.nodes[state.currentNodeId] : undefined;

  return {
    header: caseHeader(caseFile),
    scene: node ? sceneView(node) : null,
    notices: changes ? discoveryNotices(caseFile, changes) : [],
    continuations: nodeContinuations(caseFile, state, state.currentNodeId).map(toOptionView),
    investigationLines: groupOptions(openInvestigations(caseFile, state)),
    suspects: caseFile.suspects
      .filter((suspect) => !suspect.visibleAfterNodeId || state.visitedNodeIds.has(suspect.visibleAfterNodeId))
      .map((suspect) => suspectCard(suspect, state)),
    evidence: evidenceBoard(caseFile, state),
    progress: caseProgress(caseFile, state),
    accusationForm: accusationForm(caseFile, state),
    canAccuse: canAccuse(caseFile, state),
    verdict: accusation ? verdictView(caseFile, state, accusation) : null,
    closed: state.status === 'closed',
    difficulty: state.difficulty,
    difficultyLabel: DIFFICULTY_LABEL[state.difficulty],
  };
}

export type { CaseProgress, AccusationResult };
