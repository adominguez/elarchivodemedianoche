import { test } from 'node:test';
import assert from 'node:assert/strict';
import { case006 } from '../db/seeds/case-006-la-habitacion-que-respiraba.ts';
import { fromDefinition, initialState } from './case-definition.ts';
import { canAccuse, canFollow, caseProgress, judgeAccusation, nodeContinuations, openInvestigations, visitNode } from '../src/lib/domain/engine.ts';

const file=fromDefinition(case006);
const accusation={
  culpritSuspectId:'c006-s-amalia',motiveOptionId:'c006-m-herencia',methodOptionId:'c006-met-pasadizo',
  evidenceClueIds:['c006-cl-guante','c006-cl-plano','c006-cl-llave-copia','c006-cl-registro-circulo'],
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

test('el fraude espiritista completo es alcanzable en distintos órdenes',()=>{
  for(const reverse of [false,true]) {
    const state=traverse(reverse);
    assert.equal(state.visitedNodeIds.size,case006.nodes.length);
    assert.equal(state.clueStates.size,case006.clues.length);
    assert.equal(state.discoveredFactIds.size,case006.suspects.flatMap(({facts})=>facts).length);
    assert.equal(caseProgress(file,state).percent,100);
    assert.equal(canAccuse(file,state),true);
    assert.equal(judgeAccusation(file,accusation,state).verdict,'solved');
  }
});

test('las acciones tienen cabeceras y no hay opciones ligadas a una escena anterior',()=>{
  assert.ok(case006.options.every(({line})=>line));
  assert.ok(case006.options.every(({from})=>from===undefined));
  const lines=new Set(case006.options.map(({line})=>line));
  for(const expected of ['El balneario','Testimonios','La sesión','El paso oculto','El documento','El móvil','Comprobaciones','Confrontaciones','Conclusiones']) assert.ok(lines.has(expected),expected);
});

test('la acusación exige recuperar el original y tomar las tres declaraciones',()=>{
  for(const id of ['c006-n-pasadizo','c006-n-testamento','c006-n-amalia','c006-n-clara','c006-n-mateo']) {
    assert.equal(canAccuse(file,traverse(false,id)),false,id);
  }
  const state=traverse();
  const withoutHelp={...state,visitedNodeIds:new Set([...state.visitedNodeIds].filter(id=>id!=='c006-n-reconstruccion'))};
  assert.equal(canAccuse(file,withoutHelp),true);
});

test('cada grupo probatorio es necesario y marcarlo todo penaliza en Sabueso',()=>{
  const state={...traverse(),difficulty:'hound' as const};
  for(const clueId of accusation.evidenceClueIds) {
    assert.equal(judgeAccusation(file,{...accusation,evidenceClueIds:accusation.evidenceClueIds.filter(id=>id!==clueId)},state).verdict,'partial',clueId);
  }
  assert.equal(judgeAccusation(file,{...accusation,evidenceClueIds:file.clues.map(({id})=>id)},state).verdict,'partial');
});

test('cada confrontación añade una anotación nueva',()=>{
  const expected:Record<string,string>={
    'c006-n-confrontar-amalia':'c006-f-amalia-testamento',
    'c006-n-confrontar-clara':'c006-f-clara-original',
    'c006-n-confrontar-mateo':'c006-f-mateo-herramienta',
  };
  for(const [nodeId,factId] of Object.entries(expected)) {
    const before=traverse(false,nodeId);
    const after=visitNode(file,before,nodeId).state;
    assert.equal(before.discoveredFactIds.has(factId),false,nodeId);
    assert.equal(after.discoveredFactIds.has(factId),true,nodeId);
  }
});

test('la cabecera y las etiquetas de evidencia son consistentes',()=>{
  assert.equal(case006.fileCode,'#006');
  assert.equal(case006.suspects.length,3);
  assert.equal(new Set(case006.clues.flatMap(({states})=>states.map(({label})=>label))).size,case006.clues.length*2);
});

test('la tramoya conserva llamas piloto, cierra el círculo y no adelanta a la culpable',()=>{
  assert.match(case006.briefing,/llamas piloto azules/i);
  assert.match(case006.briefing,/muerte natural por neumonía/i);
  assert.match(case006.briefing,/testamento cerrado/i);
  assert.doesNotMatch(case006.briefing,/22:30|ológrafo/i);
  assert.equal(case006.clues.find(({id})=>id==='c006-cl-codicilo')?.name,'Testamento aparecido');
  const byId=new Map(case006.nodes.map(node=>[node.id,node.body]));
  assert.match(byId.get('c006-n-salon')!,/notario.*directora del hotel/is);
  assert.match(byId.get('c006-n-salon')!,/ojos cerrados/i);
  assert.match(byId.get('c006-n-reloj-gas')!,/pedal bajo la silla de Amalia/i);
  assert.match(byId.get('c006-n-codicilo')!,/rúbrica del notario/i);
  assert.match(byId.get('c006-n-intro')!,/presentarse al juez sin abrir/i);
  assert.match(byId.get('c006-n-intro')!,/Clara.*capellán/is);
  assert.match(byId.get('c006-n-trompeta')!,/presentar su contenido como respuesta de los espíritus/i);
  assert.match(byId.get('c006-n-utileria')!,/válvula real/i);
  assert.doesNotMatch(byId.get('c006-n-llave-notario')!,/Amalia/i);
  assert.doesNotMatch(byId.get('c006-n-sello')!,/Amalia|cabezas teatrales/i);
  assert.doesNotMatch(byId.get('c006-n-confrontar-amalia')!,/cinta azul/i);
  const regulator=case006.options.find(({id})=>id==='c006-o-reloj-gas');
  assert.ok(regulator?.requires?.some(({requirement,target})=>requirement==='node'&&target==='c006-n-salon'));
  let state=visitNode(file,initialState(file.id),file.entryNodeId).state;
  state=visitNode(file,state,'c006-n-utileria').state;
  assert.ok(!canFollow(file,state,'c006-o-reloj-gas'));
  state=visitNode(file,state,'c006-n-salon').state;
  assert.ok(canFollow(file,state,'c006-o-reloj-gas'));
});
