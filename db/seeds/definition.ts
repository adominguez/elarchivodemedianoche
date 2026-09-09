/**
 * Contrato de definición de un expediente.
 *
 * Es el formato de autoría: hoy lo escribe una persona, mañana lo emitirá el
 * generador por IA. `scripts/seed.ts` lo vuelca en Turso sin interpretarlo,
 * de modo que un caso nuevo no obliga a tocar la aplicación.
 *
 * Módulo TypeScript plano, sin dependencias: lo ejecuta Node directamente.
 */

/**
 * Convención de carpetas en Cloudinary:
 *
 *   archivos-de-medianoche/{historia}/portada
 *   archivos-de-medianoche/{historia}/escenas/{nombre}
 *   archivos-de-medianoche/{historia}/sospechosos/{nombre}
 *   archivos-de-medianoche/{historia}/pruebas/{nombre}
 *
 * Se declara aquí, junto al contrato, para que cada expediente nuevo la herede
 * sin repetirla y para que el generador por IA sepa dónde depositar lo suyo.
 * En Turso sólo se guarda el `publicId` que devuelven estas funciones.
 */
export const IMAGE_ROOT = 'archivos-de-medianoche';

export interface CaseAssets {
  /** Portada del expediente. */
  cover: string;
  /** Ilustración de un nodo narrativo. */
  scene: (name: string) => string;
  /** Retrato de un sospechoso. */
  suspect: (name: string) => string;
  /** Fotografía de una prueba. */
  clue: (name: string) => string;
}

export function caseAssets(story: string): CaseAssets {
  const base = `${IMAGE_ROOT}/${story}`;
  return {
    cover: `${base}/portada`,
    scene: (name) => `${base}/escenas/${name}`,
    suspect: (name) => `${base}/sospechosos/${name}`,
    clue: (name) => `${base}/pruebas/${name}`,
  };
}

export type ClueKind = 'essential' | 'secondary' | 'red_herring' | 'context';
export type FactKind = 'testimony' | 'alibi' | 'contradiction' | 'motive' | 'background';
export type NodeKind = 'intro' | 'scene' | 'interrogation' | 'analysis';

export interface FactDefinition {
  id: string;
  kind: FactKind;
  headline: string;
  detail: string;
}

export interface SuspectDefinition {
  id: string;
  name: string;
  role: string;
  description: string;
  relation?: string;
  portraitPublicId?: string;
  facts: FactDefinition[];
}

export interface ClueStateDefinition {
  key: string;
  label: string;
  description: string;
}

export interface ClueDefinition {
  id: string;
  name: string;
  kind: ClueKind;
  foundAt?: string;
  imagePublicId?: string;
  /** El primero es el estado con el que se descubre la pista. */
  states: ClueStateDefinition[];
}

export type EffectDefinition =
  | { effect: 'discover_clue'; target: string }
  | { effect: 'advance_clue'; target: string; value: string }
  | { effect: 'reveal_fact'; target: string }
  | { effect: 'set_flag'; target: string; value?: string };

export interface NodeDefinition {
  id: string;
  kind: NodeKind;
  title: string;
  location?: string;
  body: string;
  imagePublicId?: string;
  imageCaption?: string;
  effects?: EffectDefinition[];
}

export type RequirementDefinition =
  | { requirement: 'clue'; target: string }
  | { requirement: 'clue_state'; target: string; value: string }
  | { requirement: 'fact'; target: string }
  | { requirement: 'node'; target: string }
  | { requirement: 'flag'; target: string; value?: string };

export interface OptionDefinition {
  id: string;
  /** Sin `from`, la acción queda abierta en todo el expediente. */
  from?: string;
  to: string;
  label: string;
  hint?: string;
  line?: string;
  repeatable?: boolean;
  requires?: RequirementDefinition[];
}

export interface ChoiceDefinition {
  id: string;
  label: string;
}

export interface SolutionDefinition {
  culprit: string;
  motive: string;
  method: string;
  evidence: string[];
  explanation: string;
  epitaph?: string;
}

export interface CaseDefinition {
  id: string;
  slug: string;
  fileCode: string;
  title: string;
  subtitle?: string;
  place?: string;
  dateLabel?: string;
  victimName?: string;
  briefing: string;
  coverPublicId?: string;
  entryNodeId: string;
  suspects: SuspectDefinition[];
  clues: ClueDefinition[];
  nodes: NodeDefinition[];
  options: OptionDefinition[];
  motives: ChoiceDefinition[];
  methods: ChoiceDefinition[];
  solution: SolutionDefinition;
}
