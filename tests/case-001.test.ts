import { test } from 'node:test';
import assert from 'node:assert/strict';
import { case001 } from '../db/seeds/case-001-la-ultima-campanada.ts';
import { fromDefinition, initialState } from './case-definition.ts';
import { canAccuse, canFollow, visitNode, judgeAccusation, caseProgress, nodeContinuations, openInvestigations, requiredEvidenceGroups } from '../src/lib/domain/engine.ts';
const file = fromDefinition(case001);
const accusation = {culpritSuspectId:file.solution.culpritSuspectId,motiveOptionId:file.solution.motiveOptionId,methodOptionId:file.solution.methodOptionId,evidenceClueIds:file.solution.evidenceClueIds};
function traverse(reverse = false) {
  let state = visitNode(file, initialState(file.id), file.entryNodeId).state;
  for (;;) {
    const visible=[...nodeContinuations(file,state,state.currentNodeId),...openInvestigations(file,state)];
    if (reverse) visible.reverse();
    const next=visible.find(({option}) => !state.visitedNodeIds.has(option.targetNodeId));
    if (!next) return state;
    assert.ok(canFollow(file,state,next.option.id));
    state = visitNode(file,state,next.option.targetNodeId).state;
  }
}
test('el expediente completo es alcanzable en ambos órdenes y admite pruebas alternativas', () => {
  for (const reverse of [false,true]) {
    const state=traverse(reverse);
    assert.equal(state.visitedNodeIds.size,case001.nodes.length);
    assert.equal(state.clueStates.size,case001.clues.length);
    assert.equal(caseProgress(file,state).percent,100);
    assert.equal(canAccuse(file,state),true);
    assert.equal(judgeAccusation(file,accusation,state).verdict,'solved');
    const alternative={...accusation,evidenceClueIds:['c001-cl-cuaderno','c001-cl-carta-auditoria','c001-cl-informe','c001-cl-disco']};
    assert.equal(judgeAccusation(file,alternative,state).verdict,'solved');
    const houndState={...state,difficulty:'hound' as const};
    for (const id of alternative.evidenceClueIds) assert.equal(judgeAccusation(file,{...alternative,evidenceClueIds:alternative.evidenceClueIds.filter(x=>x!==id)},houndState).verdict,'partial');
  }
});
test('la dificultad adapta los aspectos probatorios sin cambiar la solución', () => {
  const complete=traverse();
  const essential={...accusation,evidenceClueIds:['c001-cl-cuaderno','c001-cl-informe','c001-cl-disco']};
  assert.equal(requiredEvidenceGroups(file,'narrative'),3);
  assert.equal(judgeAccusation(file,essential,{...complete,difficulty:'narrative'}).verdict,'solved');
  assert.equal(requiredEvidenceGroups(file,'detective'),3);
  assert.equal(judgeAccusation(file,essential,{...complete,difficulty:'detective'}).verdict,'solved');
  assert.equal(judgeAccusation(file,{...essential,evidenceClueIds:[...essential.evidenceClueIds,'c001-cl-colillas']},{...complete,difficulty:'detective'}).verdict,'partial');
  assert.equal(requiredEvidenceGroups(file,'hound'),4);
  assert.equal(judgeAccusation(file,accusation,{...complete,difficulty:'hound'}).verdict,'solved');
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
  assert.equal(canAccuse(file,initialState(file.id)),false);
  assert.equal(judgeAccusation(file,accusation,initialState(file.id)).verdict,'partial');
});

test('el cajón del despacho sigue disponible después de abandonar la escena', () => {
  let state=visitNode(file,initialState(file.id),file.entryNodeId).state;
  state=visitNode(file,state,'c001-n-despacho').state;
  state=visitNode(file,state,'c001-n-invernadero').state;
  assert.ok(openInvestigations(file,state).some(({option})=>option.id==='c001-o-despacho-libro'));
});
