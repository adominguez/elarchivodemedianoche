import { test } from 'node:test';
import assert from 'node:assert/strict';
import { case005 } from '../db/seeds/case-005-ocho-minutos-bajo-tierra.ts';
import { fromDefinition, initialState } from './case-definition.ts';
import { canAccuse, canFollow, caseProgress, judgeAccusation, nodeContinuations, openInvestigations, visitNode } from '../src/lib/domain/engine.ts';

const file=fromDefinition(case005);
const accusation={
  culpritSuspectId:'c005-s-julian',motiveOptionId:'c005-m-deuda',methodOptionId:'c005-met-descenso',
  evidenceClueIds:['c005-cl-lampara','c005-cl-tenaza','c005-cl-soga','c005-cl-pagare'],
};

test('la cabecera y las etiquetas de las pistas son inequívocas',()=>{
  assert.equal(case005.fileCode,'#005');
  const labels=case005.clues.flatMap(clue=>clue.states.map(state=>state.label));
  assert.equal(new Set(labels).size,labels.length);
  for(const clue of case005.clues) {
    assert.equal(clue.states[0]?.label,clue.name);
    assert.match(clue.states[1]?.label ?? '',new RegExp('^' + clue.name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')));
  }
});

test('la cronología sitúa el kilómetro 84,6 a mitad de la reducción',()=>{
  const text=case005.nodes.map(node=>node.body).join(' ');
  assert.match(text,/1,6 kilómetros/);
  assert.match(text,/23:47/);
  assert.match(text,/parte falso/);
  assert.match(text,/retuvo el sobre cerrado como prueba/);
  assert.match(text,/Los tres detalles/);
});

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

test('el robo ferroviario completo es alcanzable en distintos órdenes',()=>{
  for(const reverse of [false,true]) {
    const state=traverse(reverse);
    assert.equal(state.visitedNodeIds.size,case005.nodes.length);
    assert.equal(state.clueStates.size,case005.clues.length);
    assert.equal(caseProgress(file,state).percent,100);
    assert.equal(canAccuse(file,state),true);
    assert.equal(judgeAccusation(file,accusation,state).verdict,'solved');
  }
});

test('recuperar la caja y tomar las seis declaraciones abre la acusación sin exigir la reconstrucción',()=>{
  const state=traverse();
  const withoutReconstruction={...state,visitedNodeIds:new Set([...state.visitedNodeIds].filter(id=>id!=='c005-n-reconstruccion'))};
  assert.equal(canAccuse(file,withoutReconstruction),true);
});

test('la acusación exige recuperar la caja e interrogar a las seis personas',()=>{
  for(const id of ['c005-n-caja','c005-n-julian','c005-n-tomas','c005-n-eusebio','c005-n-marcelo','c005-n-nuria','c005-n-adela']) {
    assert.equal(canAccuse(file,traverse(false,id)),false,id);
  }
});

test('cada cadena probatoria es necesaria y seleccionar todo no resuelve',()=>{
  const state={...traverse(),difficulty:'hound' as const};
  for(const clueId of accusation.evidenceClueIds) {
    assert.equal(judgeAccusation(file,{...accusation,evidenceClueIds:accusation.evidenceClueIds.filter(id=>id!==clueId)},state).verdict,'partial',clueId);
  }
  assert.equal(judgeAccusation(file,{...accusation,evidenceClueIds:file.clues.map(({id})=>id)},state).verdict,'partial');
  assert.equal(judgeAccusation(file,{...accusation,evidenceClueIds:file.clues.map(({id})=>id)},{...state,difficulty:'detective'}).verdict,'partial');
});

test('las seis confrontaciones dejan una conclusión nueva en las fichas',()=>{
  const confrontations: Record<string,string[]> = {
    'c005-n-confrontar-julian':['c005-f-julian-sacos'],
    'c005-n-confrontar-tomas':['c005-f-tomas-cristal'],
    'c005-n-confrontar-eusebio':['c005-f-eusebio-dospasadas'],
    'c005-n-confrontar-marcelo':['c005-f-marcelo-ruta'],
    'c005-n-confrontar-nuria':['c005-f-nuria-destinatario'],
    'c005-n-confrontar-adela':['c005-f-adela-golpe'],
  };
  for(const [nodeId,expected] of Object.entries(confrontations)) {
    const before=traverse(false,nodeId);
    const action=[...nodeContinuations(file,before,before.currentNodeId),...openInvestigations(file,before)].find(({option})=>option.targetNodeId===nodeId);
    assert.ok(action,nodeId);
    const after=visitNode(file,before,nodeId).state;
    const gained=[...after.discoveredFactIds].filter(id=>!before.discoveredFactIds.has(id));
    assert.deepEqual(gained.sort(),expected.sort(),nodeId);
  }
});

test('acertar la teoría al inicio no resuelve el expediente',()=>{
  const state=visitNode(file,initialState(file.id),file.entryNodeId).state;
  assert.equal(canAccuse(file,state),false);
  assert.equal(judgeAccusation(file,accusation,state).verdict,'partial');
});
