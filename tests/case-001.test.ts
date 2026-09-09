import { test } from 'node:test';
import assert from 'node:assert/strict';
import { case001 } from '../db/seeds/case-001-la-ultima-campanada.ts';
import { fromDefinition, initialState } from './case-definition.ts';
import { canFollow, visitNode, judgeAccusation, caseProgress } from '../src/lib/domain/engine.ts';
const file = fromDefinition(case001);
const accusation = {culpritSuspectId:file.solution.culpritSuspectId,motiveOptionId:file.solution.motiveOptionId,methodOptionId:file.solution.methodOptionId,evidenceClueIds:file.solution.evidenceClueIds};
function traverse(reverse = false) {
  let state = visitNode(file, initialState(file.id), file.entryNodeId).state;
  const options = reverse ? [...file.options].reverse() : file.options;
  for (;;) {
    const option = options.find(o => !state.visitedNodeIds.has(o.targetNodeId) && canFollow(file,state,o.id));
    if (!option) return state;
    state = visitNode(file,state,option.targetNodeId).state;
  }
}
test('el expediente completo es alcanzable en ambos órdenes y admite pruebas alternativas', () => {
  for (const reverse of [false,true]) {
    const state=traverse(reverse);
    assert.equal(state.visitedNodeIds.size,case001.nodes.length);
    assert.equal(state.clueStates.size,case001.clues.length);
    assert.equal(caseProgress(file,state).percent,100);
    assert.equal(judgeAccusation(file,accusation,state).verdict,'solved');
    const alternative={...accusation,evidenceClueIds:['c001-cl-cuaderno','c001-cl-carta-auditoria','c001-cl-informe','c001-cl-disco']};
    assert.equal(judgeAccusation(file,alternative,state).verdict,'solved');
    for (const id of alternative.evidenceClueIds) assert.equal(judgeAccusation(file,{...alternative,evidenceClueIds:alternative.evidenceClueIds.filter(x=>x!==id)},state).verdict,'partial');
  }
});
test('escuchar el disco e interrogar a Irene no revela automáticamente la reconstrucción', () => {
  let state=initialState(file.id);
  for (const id of ['intro','salon','vera','disco-hallado','disco-escuchado','irene']) state=visitNode(file,state,`c001-n-${id}`).state;
  assert.equal(canFollow(file,state,'c001-o-reconstruccion'),null);
  assert.equal(state.visitedNodeIds.has('c001-n-despacho'),false);
});
test('releer el disco no pierde su comprobación ni bloquea el recorrido', () => {
  const complete=traverse();
  const reread=visitNode(file,complete,'c001-n-disco-escuchado').state;
  assert.equal(reread.clueStates.get('c001-cl-disco'),'verified');
  assert.ok(canFollow(file,reread,'c001-o-recorrido'));
});
test('el expediente no se resuelve por acertar las opciones sin investigar', () => {
  assert.equal(judgeAccusation(file,accusation,initialState(file.id)).verdict,'partial');
});
