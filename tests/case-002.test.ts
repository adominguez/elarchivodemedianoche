import { test } from 'node:test';
import assert from 'node:assert/strict';
import { case002 } from '../db/seeds/case-002-la-senal-bajo-el-hielo.ts';
import { fromDefinition, initialState } from './case-definition.ts';
import { canFollow, caseProgress, judgeAccusation, visitNode } from '../src/lib/domain/engine.ts';

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
  const options = reverse ? [...file.options].reverse() : file.options;
  for (;;) {
    const option = options.find(
      (candidate) =>
        !state.visitedNodeIds.has(candidate.targetNodeId) && canFollow(file, state, candidate.id),
    );
    if (!option) return state;
    state = visitNode(file, state, option.targetNodeId).state;
  }
}

test('el expediente polar es completamente alcanzable en distintos órdenes', () => {
  for (const reverse of [false, true]) {
    const state = traverse(reverse);
    assert.equal(state.visitedNodeIds.size, case002.nodes.length);
    assert.equal(state.clueStates.size, case002.clues.length);
    assert.equal(caseProgress(file, state).percent, 100);
    assert.equal(state.flags.get('victima_rescatada'), '1');
    assert.equal(judgeAccusation(file, accusation, state).verdict, 'solved');
  }
});

test('no se accede al refugio sin mapa, tarjeta y descarte de intrusos', () => {
  const state = visitNode(file, initialState(file.id), file.entryNodeId).state;
  assert.equal(canFollow(file, state, 'c002-o-rescate'), null);
});

test('acertar culpable, motivo y método sin investigar no cierra el expediente', () => {
  assert.equal(judgeAccusation(file, accusation, initialState(file.id)).verdict, 'partial');
});

test('cada grupo de la acusación es necesario', () => {
  const state = traverse();
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
