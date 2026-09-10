/**
 * Pruebas del motor de investigación.
 *
 * El motor es puro, así que se prueba sin Turso ni Astro: se construye un
 * expediente mínimo en memoria y se comprueban las reglas que sostienen la
 * experiencia (no exclusión, desbloqueos, evolución de pistas, acusación).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  areRequirementsMet,
  canFollow,
  caseProgress,
  judgeAccusation,
  nodeContinuations,
  openInvestigations,
  visitNode,
} from '../src/lib/domain/engine.ts';
import type { CaseFile, InvestigationState } from '../src/lib/domain/types.ts';

const caseFile: CaseFile = {
  id: 'x',
  slug: 'x',
  fileCode: '#000',
  title: 'Caso de pruebas',
  subtitle: null,
  place: null,
  dateLabel: null,
  victimName: null,
  briefing: 'briefing',
  coverPublicId: null,
  entryNodeId: 'n-intro',
  nodes: {
    'n-intro': {
      id: 'n-intro',
      kind: 'intro',
      title: 'Intro',
      location: null,
      body: ['uno'],
      imagePublicId: null,
      imageCaption: null,
      effects: [],
    },
    'n-despacho': {
      id: 'n-despacho',
      kind: 'scene',
      title: 'Despacho',
      location: null,
      body: ['dos'],
      imagePublicId: null,
      imageCaption: null,
      effects: [
        { effect: 'discover_clue', targetId: 'cl-llave', value: null },
        { effect: 'reveal_fact', targetId: 'f-1', value: null },
      ],
    },
    'n-analisis': {
      id: 'n-analisis',
      kind: 'analysis',
      title: 'Análisis',
      location: null,
      body: ['tres'],
      imagePublicId: null,
      imageCaption: null,
      effects: [
        { effect: 'advance_clue', targetId: 'cl-llave', value: 'analyzed' },
        { effect: 'set_flag', targetId: 'listo', value: '1' },
      ],
    },
    'n-vera': {
      id: 'n-vera',
      kind: 'interrogation',
      title: 'Vera',
      location: null,
      body: ['cuatro'],
      imagePublicId: null,
      imageCaption: null,
      effects: [],
    },
  },
  options: [
    { id: 'o-despacho', sourceNodeId: null, targetNodeId: 'n-despacho', label: 'Despacho', hint: null, line: 'Casa', repeatable: false, requirements: [] },
    { id: 'o-analisis', sourceNodeId: null, targetNodeId: 'n-analisis', label: 'Analizar', hint: null, line: 'Casa', repeatable: false, requirements: [{ requirement: 'clue', targetId: 'cl-llave', value: null }] },
    { id: 'o-vera', sourceNodeId: null, targetNodeId: 'n-vera', label: 'Vera', hint: null, line: 'Gente', repeatable: false, requirements: [{ requirement: 'clue_state', targetId: 'cl-llave', value: 'analyzed' }] },
    { id: 'o-cont', sourceNodeId: 'n-intro', targetNodeId: 'n-despacho', label: 'Seguir', hint: null, line: null, repeatable: false, requirements: [] },
  ],
  suspects: [
    {
      id: 's-abel',
      name: 'Abel',
      role: 'Administrador',
      portraitPublicId: null,
      description: '',
      relation: null,
      facts: [{ id: 'f-1', suspectId: 's-abel', kind: 'contradiction', headline: 'h', detail: 'd' }],
    },
    { id: 's-vera', name: 'Vera', role: 'Ama de llaves', portraitPublicId: null, description: '', relation: null, facts: [] },
  ],
  clues: [
    {
      id: 'cl-llave',
      name: 'Llave',
      kind: 'essential',
      imagePublicId: null,
      foundAt: null,
      states: [
        { key: 'found', label: 'Llave', description: 'a' },
        { key: 'analyzed', label: 'Llave — analizada', description: 'b' },
      ],
    },
  ],
  solutionOptions: [
    { id: 'mo-1', dimension: 'motive', label: 'Motivo bueno' },
    { id: 'mo-2', dimension: 'motive', label: 'Motivo malo' },
    { id: 'me-1', dimension: 'method', label: 'Método bueno' },
    { id: 'me-2', dimension: 'method', label: 'Método malo' },
  ],
  solution: {
    culpritSuspectId: 's-abel',
    motiveOptionId: 'mo-1',
    methodOptionId: 'me-1',
    explanation: 'porque sí',
    epitaph: null,
    evidenceClueIds: ['cl-llave'],
    evidenceGroups: [{ label: 'Prueba', alternatives: [{ clueId: 'cl-llave', stateKey: 'analyzed' }] }],
    accusationRequirements: [],
  },
};

function emptyState(): InvestigationState {
  return {
    id: 'i',
    caseId: 'x',
    status: 'open',
    difficulty: 'detective',
    currentNodeId: null,
    visitedNodeIds: new Set(),
    clueStates: new Map(),
    discoveredFactIds: new Set(),
    flags: new Map(),
  };
}

test('las acciones bloqueadas no se ofrecen hasta cumplir su requisito', () => {
  const open = openInvestigations(caseFile, emptyState());
  assert.deepEqual(
    open.map((entry) => entry.option.id),
    ['o-despacho'],
  );
});

test('visitar un nodo descubre pistas y hechos, y desbloquea nuevas acciones', () => {
  const { state, changes } = visitNode(caseFile, emptyState(), 'n-despacho');

  assert.deepEqual(changes.discoveredClues, [{ clueId: 'cl-llave', stateKey: 'found' }]);
  assert.deepEqual(changes.revealedFactIds, ['f-1']);
  assert.equal(state.clueStates.get('cl-llave'), 'found');

  const ids = openInvestigations(caseFile, state).map((entry) => entry.option.id);
  assert.deepEqual(ids, ['o-despacho', 'o-analisis']);
});

test('la investigación no es excluyente: lo recorrido sigue listado y marcado', () => {
  const { state } = visitNode(caseFile, emptyState(), 'n-despacho');
  const despacho = openInvestigations(caseFile, state).find((entry) => entry.option.id === 'o-despacho');

  assert.equal(despacho?.status, 'completed');
  assert.equal(
    openInvestigations(caseFile, state).find((entry) => entry.option.id === 'o-analisis')?.status,
    'unlocked',
  );
});

test('una pista evoluciona y su nuevo estado abre otra diligencia', () => {
  const first = visitNode(caseFile, emptyState(), 'n-despacho');
  const second = visitNode(caseFile, first.state, 'n-analisis');

  assert.deepEqual(second.changes.advancedClues, [{ clueId: 'cl-llave', stateKey: 'analyzed' }]);
  assert.equal(second.state.clueStates.get('cl-llave'), 'analyzed');
  assert.equal(second.state.flags.get('listo'), '1');

  const ids = openInvestigations(caseFile, second.state).map((entry) => entry.option.id);
  assert.ok(ids.includes('o-vera'));
});

test('revisitar un nodo no vuelve a anunciar lo ya conocido', () => {
  const first = visitNode(caseFile, emptyState(), 'n-despacho');
  const again = visitNode(caseFile, first.state, 'n-despacho');

  assert.equal(again.changes.discoveredClues.length, 0);
  assert.equal(again.changes.revealedFactIds.length, 0);
  assert.equal(again.changes.nodeFirstVisit, false);
});

test('las continuaciones pertenecen al nodo que se está leyendo', () => {
  const state = { ...emptyState(), currentNodeId: 'n-intro' };
  assert.deepEqual(
    nodeContinuations(caseFile, state, 'n-intro').map((entry) => entry.option.id),
    ['o-cont'],
  );
  assert.deepEqual(nodeContinuations(caseFile, state, 'n-vera'), []);
});

test('no se puede seguir una acción cuyo requisito no se cumple', () => {
  assert.equal(canFollow(caseFile, emptyState(), 'o-analisis'), null);
  assert.equal(canFollow(caseFile, emptyState(), 'o-inventada'), null);
  assert.ok(canFollow(caseFile, emptyState(), 'o-despacho'));
});

test('una continuación no se sigue desde un nodo que no se ha visitado', () => {
  assert.equal(canFollow(caseFile, emptyState(), 'o-cont'), null);
  const { state } = visitNode(caseFile, emptyState(), 'n-intro');
  assert.ok(canFollow(caseFile, state, 'o-cont'));
});

test('los requisitos de bandera aceptan presencia o valor exacto', () => {
  const state = { ...emptyState(), flags: new Map([['listo', '1']]) };
  const option = { ...caseFile.options[0]!, requirements: [{ requirement: 'flag' as const, targetId: 'listo', value: null }] };
  assert.equal(areRequirementsMet(option, state), true);
  assert.equal(
    areRequirementsMet({ ...option, requirements: [{ requirement: 'flag', targetId: 'listo', value: '2' }] }, state),
    false,
  );
});

test('el progreso cuenta pistas, anotaciones y diligencias', () => {
  const { state } = visitNode(caseFile, emptyState(), 'n-despacho');
  const progress = caseProgress(caseFile, state);

  assert.deepEqual(
    { c: progress.cluesFound, t: progress.cluesTotal, f: progress.factsFound, n: progress.nodesVisited },
    { c: 1, t: 1, f: 1, n: 1 },
  );
  // 3 hallazgos sobre 1 pista + 1 hecho + 4 nodos.
  assert.equal(progress.percent, 50);
});

test('la acusación distingue acierto, acierto parcial y fallo', () => {
  const correct = judgeAccusation(caseFile, {
    culpritSuspectId: 's-abel',
    motiveOptionId: 'mo-1',
    methodOptionId: 'me-1',
    evidenceClueIds: ['cl-llave'],
  }, visitNode(caseFile, emptyState(), 'n-analisis').state);
  assert.equal(correct.verdict, 'solved');
  assert.equal(correct.evidenceHits, 1);
  assert.equal(correct.evidenceTotal, 1);

  const partial = judgeAccusation(caseFile, {
    culpritSuspectId: 's-abel',
    motiveOptionId: 'mo-2',
    methodOptionId: 'me-2',
    evidenceClueIds: [],
  }, emptyState());
  assert.equal(partial.verdict, 'partial');

  const failed = judgeAccusation(caseFile, {
    culpritSuspectId: 's-vera',
    motiveOptionId: 'mo-2',
    methodOptionId: 'me-2',
    evidenceClueIds: [],
  }, emptyState());
  assert.equal(failed.verdict, 'failed');
});

const correctAccusation = { culpritSuspectId: 's-abel', motiveOptionId: 'mo-1', methodOptionId: 'me-1', evidenceClueIds: ['cl-llave'] };
test('acertar sin pruebas, con una prueba no descubierta o sin analizar no cierra el caso', () => {
  assert.equal(judgeAccusation(caseFile, { ...correctAccusation, evidenceClueIds: [] }, emptyState()).verdict, 'partial');
  const forged = judgeAccusation(caseFile, correctAccusation, emptyState());
  assert.equal(forged.verdict, 'partial');
  assert.equal(forged.evidenceHits, 0);
  const found = visitNode(caseFile, emptyState(), 'n-despacho').state;
  assert.equal(judgeAccusation(caseFile, correctAccusation, found).verdict, 'partial');
  const analyzed = visitNode(caseFile, found, 'n-analisis').state;
  assert.equal(judgeAccusation(caseFile, correctAccusation, analyzed).verdict, 'solved');
});
test('un expediente sin reglas de evidencia no permite cerrar por azar', () => {
  const analyzed = visitNode(caseFile, emptyState(), 'n-analisis').state;
  assert.equal(judgeAccusation({ ...caseFile, solution: { ...caseFile.solution, evidenceGroups: [] } }, correctAccusation, analyzed).verdict, 'partial');
});
