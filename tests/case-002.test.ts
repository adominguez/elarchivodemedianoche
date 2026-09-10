import { test } from 'node:test';
import assert from 'node:assert/strict';
import { case002 } from '../db/seeds/case-002-la-senal-bajo-el-hielo.ts';
import { fromDefinition, initialState } from './case-definition.ts';
import { canAccuse, canFollow, caseProgress, judgeAccusation, nodeContinuations, openInvestigations, visitNode } from '../src/lib/domain/engine.ts';

const file = fromDefinition(case002);
const accusation = {
  culpritSuspectId: file.solution.culpritSuspectId,
  motiveOptionId: file.solution.motiveOptionId,
  methodOptionId: file.solution.methodOptionId,
  evidenceClueIds: [
    'c002-cl-registro-radio',
    'c002-cl-tarjeta',
    'c002-cl-cinta-boletin',
    'c002-cl-mensaje-telex',
  ],
};

function traverse(reverse = false) {
  let state = visitNode(file, initialState(file.id), file.entryNodeId).state;
  for (;;) {
    const visible = [
      ...nodeContinuations(file, state, state.currentNodeId),
      ...openInvestigations(file, state),
    ];
    if (reverse) visible.reverse();
    const next = visible.find(({ option }) => !state.visitedNodeIds.has(option.targetNodeId));
    if (!next) return state;
    assert.ok(canFollow(file, state, next.option.id));
    state = visitNode(file, state, next.option.targetNodeId).state;
  }
}

test('la sala de radio sigue visible después de elegir otra diligencia', () => {
  let state = visitNode(file, initialState(file.id), file.entryNodeId).state;
  const laboratory = canFollow(file, state, 'c002-o-laboratorio');
  assert.ok(laboratory);
  state = visitNode(file, state, laboratory.targetNodeId).state;
  assert.ok(openInvestigations(file, state).some(({ option }) => option.id === 'c002-o-intro-radio'));
});

test('el expediente polar es completamente alcanzable en distintos órdenes', () => {
  for (const reverse of [false, true]) {
    const state = traverse(reverse);
    assert.equal(state.visitedNodeIds.size, case002.nodes.length);
    assert.equal(state.clueStates.size, case002.clues.length);
    assert.equal(caseProgress(file, state).percent, 100);
    assert.equal(state.flags.get('victima_rescatada'), '1');
    assert.equal(canAccuse(file, state), true);
    assert.equal(judgeAccusation(file, accusation, state).verdict, 'solved');
  }
});

test('no se accede al refugio sin localizarlo en el mapa', () => {
  const state = visitNode(file, initialState(file.id), file.entryNodeId).state;
  assert.equal(canFollow(file, state, 'c002-o-rescate'), null);
});

test('acertar culpable, motivo y método sin investigar no cierra el expediente', () => {
  assert.equal(canAccuse(file, initialState(file.id)), false);
  assert.equal(judgeAccusation(file, accusation, initialState(file.id)).verdict, 'partial');
});

test('marcar indicios ajenos a la teoría impide cerrar el expediente', () => {
  const state = { ...traverse(), difficulty: 'hound' as const };
  assert.equal(
    judgeAccusation(file, { ...accusation, evidenceClueIds: file.clues.map(({ id }) => id) }, state).verdict,
    'partial',
  );
});

test('cada grupo de la acusación es necesario', () => {
  const state = { ...traverse(), difficulty: 'hound' as const };
  for (const clueId of accusation.evidenceClueIds) {
    assert.equal(
      judgeAccusation(
        file,
        { ...accusation, evidenceClueIds: accusation.evidenceClueIds.filter((id) => id !== clueId) },
        state,
      ).verdict,
      'partial',
    );
  }
});
