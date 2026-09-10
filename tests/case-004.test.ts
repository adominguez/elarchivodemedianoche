import { test } from 'node:test';
import assert from 'node:assert/strict';
import { case004 } from '../db/seeds/case-004-noventa-segundos-de-sombra.ts';
import { fromDefinition, initialState } from './case-definition.ts';
import { canAccuse, canFollow, caseProgress, judgeAccusation, nodeContinuations, openInvestigations, visitNode } from '../src/lib/domain/engine.ts';

const file=fromDefinition(case004);
const accusation={
  culpritSuspectId:'c004-s-elisa',motiveOptionId:'c004-mo-prestigio',methodOptionId:'c004-me-montaje',
  evidenceClueIds:['c004-cl-oscilograma','c004-cl-rele-proteccion','c004-cl-huellas-polvo','c004-cl-telegrama'],
};

function traverse(reverse=false,blockedNodeId?:string) {
  let state=visitNode(file,initialState(file.id),file.entryNodeId).state;
  for (;;) {
    const visible=[...nodeContinuations(file,state,state.currentNodeId),...openInvestigations(file,state)];
    if(reverse) visible.reverse();
    const next=visible.find(({option})=>option.targetNodeId!==blockedNodeId&&!state.visitedNodeIds.has(option.targetNodeId));
    if(!next) return state;
    assert.ok(canFollow(file,state,next.option.id));
    state=visitNode(file,state,next.option.targetNodeId).state;
  }
}

test('la desaparición completa es alcanzable en distintos órdenes',()=>{
  for(const reverse of [false,true]) {
    const state=traverse(reverse);
    assert.equal(state.visitedNodeIds.size,case004.nodes.length);
    assert.equal(state.clueStates.size,case004.clues.length);
    assert.equal(caseProgress(file,state).percent,100);
    assert.equal(canAccuse(file,state),true);
    assert.equal(judgeAccusation(file,accusation,state).verdict,'solved');
  }
});

test('encontrar a Elisa y tomar todas las declaraciones abre la acusación sin exigir la reconstrucción',()=>{
  const state=traverse();
  const withoutReconstruction={...state,visitedNodeIds:new Set([...state.visitedNodeIds].filter(id=>id!=='c004-n-reconstruccion'))};
  assert.equal(canAccuse(file,withoutReconstruction),true);
});

test('la acusación exige encontrar a Elisa e interrogar a las cinco personas',()=>{
  for(const id of ['c004-n-tunel','c004-n-elisa','c004-n-ines','c004-n-soraya','c004-n-teresa','c004-n-gabriel']) {
    assert.equal(canAccuse(file,traverse(false,id)),false,id);
  }
});

test('cada cadena probatoria es necesaria y los indicios indiscriminados penalizan',()=>{
  const state={...traverse(),difficulty:'hound' as const};
  for(const clueId of accusation.evidenceClueIds) {
    const evidenceClueIds=accusation.evidenceClueIds.filter(id=>id!==clueId);
    assert.equal(judgeAccusation(file,{...accusation,evidenceClueIds},state).verdict,'partial',clueId);
  }
  assert.equal(judgeAccusation(file,{...accusation,evidenceClueIds:file.clues.map(({id})=>id)},state).verdict,'partial');
});

test('acertar la teoría antes de investigar no resuelve el expediente',()=>{
  const state=visitNode(file,initialState(file.id),file.entryNodeId).state;
  assert.equal(canAccuse(file,state),false);
  assert.equal(judgeAccusation(file,accusation,state).verdict,'partial');
});
