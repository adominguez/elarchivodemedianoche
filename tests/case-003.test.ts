import { test } from 'node:test';
import assert from 'node:assert/strict';
import { case003 } from '../db/seeds/case-003-la-puja-de-humo.ts';
import { fromDefinition, initialState } from './case-definition.ts';
import { canAccuse, canFollow, caseProgress, judgeAccusation, nodeContinuations, openInvestigations, visitNode } from '../src/lib/domain/engine.ts';

const file=fromDefinition(case003);
const accusation={culpritSuspectId:'c003-s-celia',motiveOptionId:'c003-mo-deuda',methodOptionId:'c003-me-doble-fraude',evidenceClueIds:['c003-cl-catalogo','c003-cl-pase','c003-cl-fax','c003-cl-factura']};

function traverse(reverse=false, blockedNodeId?:string) {
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

test('la estafa completa es alcanzable en distintos órdenes por la interfaz real',()=>{
  for(const reverse of [false,true]) {
    const state=traverse(reverse);
    assert.equal(state.visitedNodeIds.size,case003.nodes.length);
    assert.equal(state.clueStates.size,case003.clues.length);
    assert.equal(caseProgress(file,state).percent,100);
    assert.equal(canAccuse(file,state),true);
    assert.equal(judgeAccusation(file,accusation,state).verdict,'solved');
  }
});

test('la caja recuperada abre la acusación y la reconstrucción queda como ayuda opcional',()=>{
  assert.equal(canAccuse(file,initialState(file.id)),false);
  const state=traverse();
  const withoutReconstruction={...state,visitedNodeIds:new Set([...state.visitedNodeIds].filter(id=>id!=='c003-n-reconstruccion'))};
  assert.equal(canAccuse(file,withoutReconstruction),true);
});

test('el recorrido necesario obliga a interrogar a los cuatro implicados',()=>{
  for(const id of ['c003-n-celia','c003-n-bruno','c003-n-nadia','c003-n-leo']) {
    assert.equal(canAccuse(file,traverse(false,id)),false,id);
  }
});

test('cada grupo probatorio es necesario y los indicios indiscriminados penalizan',()=>{
  const state={...traverse(),difficulty:'hound' as const};
  for(const clueId of accusation.evidenceClueIds) {
    assert.equal(judgeAccusation(file,{...accusation,evidenceClueIds:accusation.evidenceClueIds.filter(id=>id!==clueId)},state).verdict,'partial');
  }
  assert.equal(judgeAccusation(file,{...accusation,evidenceClueIds:file.clues.map(({id})=>id)},state).verdict,'partial');
  assert.equal(judgeAccusation(file,{...accusation,evidenceClueIds:['c003-cl-catalogo','c003-cl-pase','c003-cl-cuenta']},state).verdict,'partial');
});

test('las confrontaciones añaden conclusiones nuevas y los secretos secundarios quedan separados',()=>{
  const confrontations: Record<string,string[]> = {
    'c003-n-confrontar-celia':['c003-f-celia-cuenta'],
    'c003-n-confrontar-bruno':['c003-f-bruno-pujas'],
    'c003-n-confrontar-nadia':['c003-f-nadia-marcas'],
    'c003-n-confrontar-leo':['c003-f-leo-camara','c003-f-leo-entregas'],
  };
  for(const [nodeId,expected] of Object.entries(confrontations)) {
    const before=traverse(false,nodeId);
    const action=[...nodeContinuations(file,before,before.currentNodeId),...openInvestigations(file,before)].find(({option})=>option.targetNodeId===nodeId);
    assert.ok(action,nodeId);
    const after=visitNode(file,before,nodeId).state;
    const gained=[...after.discoveredFactIds].filter(id=>!before.discoveredFactIds.has(id));
    assert.deepEqual(gained.sort(),expected.sort(),nodeId);
  }
  const state=traverse();
  for(const factId of ['c003-f-celia-cuenta','c003-f-bruno-pujas','c003-f-nadia-barniz','c003-f-nadia-marcas','c003-f-leo-camara']) {
    assert.ok(state.discoveredFactIds.has(factId));
  }
});
