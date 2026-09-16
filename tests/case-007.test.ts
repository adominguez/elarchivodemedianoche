import { test } from 'node:test';
import assert from 'node:assert/strict';
import { case007 } from '../db/seeds/case-007-el-rugido-bajo-el-agua.ts';
import { fromDefinition, initialState } from './case-definition.ts';
import { canAccuse, canFollow, caseProgress, judgeAccusation, nodeContinuations, openInvestigations, visitNode } from '../src/lib/domain/engine.ts';

const file=fromDefinition(case007);
const accusation={
  culpritSuspectId:'c007-s-leire',motiveOptionId:'c007-m-proteger',methodOptionId:'c007-met-galeria',
  evidenceClueIds:['c007-cl-dardo','c007-cl-bisagra','c007-cl-ascensor','c007-cl-sira','c007-cl-contrato'],
};

function traverse(reverse=false,blockedNodeId?:string){
  let state=visitNode(file,initialState(file.id),file.entryNodeId).state;
  for(;;){
    const visible=[...nodeContinuations(file,state,state.currentNodeId),...openInvestigations(file,state)];
    if(reverse) visible.reverse();
    const next=visible.find(({option})=>option.targetNodeId!==blockedNodeId&&!state.visitedNodeIds.has(option.targetNodeId));
    if(!next)return state;
    assert.ok(canFollow(file,state,next.option.id));
    state=visitNode(file,state,next.option.targetNodeId).state;
  }
}

test('el rescate clandestino completo es alcanzable en distintos órdenes',()=>{
  for(const reverse of [false,true]){
    const state=traverse(reverse);
    assert.equal(state.visitedNodeIds.size,case007.nodes.length);
    assert.equal(state.clueStates.size,case007.clues.length);
    assert.equal(state.discoveredFactIds.size,case007.suspects.flatMap(({facts})=>facts).length);
    assert.equal(caseProgress(file,state).percent,100);
    assert.equal(canAccuse(file,state),true);
    assert.equal(judgeAccusation(file,accusation,state).verdict,'solved');
  }
});

test('las diligencias están separadas por zonas y fases',()=>{
  assert.equal(case007.fileCode,'#007');
  assert.equal(case007.suspects.length,5);
  assert.ok(case007.options.every(({line,from})=>line&&from===undefined));
  const lines=new Set(case007.options.map(({line})=>line));
  for(const expected of ['El zoológico','Testimonios','El recinto','La ruta de servicio','El traslado','Comprobaciones','La tigresa','Confrontaciones','Conclusiones']) assert.ok(lines.has(expected),expected);
});

test('recuperar a Sira y tomar las cinco declaraciones abre la acusación sin exigir la reconstrucción',()=>{
  for(const id of ['c007-n-cuarentena','c007-n-sira','c007-n-leire','c007-n-mauro','c007-n-nerea','c007-n-basilio','c007-n-raul']){
    assert.equal(canAccuse(file,traverse(false,id)),false,id);
  }
  const state=traverse();
  const withoutHelp={...state,visitedNodeIds:new Set([...state.visitedNodeIds].filter(id=>id!=='c007-n-reconstruccion'))};
  assert.equal(canAccuse(file,withoutHelp),true);
});

test('cada grupo probatorio es necesario y seleccionar todo penaliza',()=>{
  const state={...traverse(),difficulty:'hound' as const};
  for(const clueId of accusation.evidenceClueIds){
    const evidenceClueIds=accusation.evidenceClueIds.filter(id=>id!==clueId);
    assert.equal(judgeAccusation(file,{...accusation,evidenceClueIds},state).verdict,'partial',clueId);
  }
  assert.equal(judgeAccusation(file,{...accusation,evidenceClueIds:file.clues.map(({id})=>id)},state).verdict,'partial');
});

test('cada confrontación añade una conclusión nueva',()=>{
  const expected:Record<string,string>={
    'c007-n-confrontar-leire':'c007-f-leire-grasa',
    'c007-n-confrontar-mauro':'c007-f-mauro-destino',
    'c007-n-confrontar-nerea':'c007-f-nerea-sombra',
    'c007-n-confrontar-basilio':'c007-f-basilio-viajes',
    'c007-n-confrontar-raul':'c007-f-raul-gasoleo',
  };
  for(const [nodeId,factId] of Object.entries(expected)){
    const before=traverse(false,nodeId);
    const after=visitNode(file,before,nodeId).state;
    assert.equal(before.discoveredFactIds.has(factId),false,nodeId);
    assert.equal(after.discoveredFactIds.has(factId),true,nodeId);
  }
});

test('la cadena física mantiene los pesos y el tiempo',()=>{
  const text=[case007.briefing,...case007.nodes.map(({body})=>body)].join(' ');
  assert.match(text,/238 kilos/);
  assert.match(text,/142/);
  assert.match(text,/96/);
  assert.match(text,/22:20/);
  assert.match(text,/22:24/);
  assert.match(text,/22:27/);
  assert.match(text,/107 segundos/);
  assert.match(text,/dieciocho metros/);
  assert.match(text,/precinto.*intacto|precinto.*entero/is);
});

test('el plan previo no depende de que Leire pueda predecir una avería',()=>{
  const text=[case007.briefing,...case007.nodes.map(({body})=>body),case007.solution.explanation].join(' ');
  assert.match(text,/boletín.*18:00/is);
  assert.match(text,/protocolo.*aislar.*iluminación/is);
  assert.match(text,/no provocó.*descarga/is);
  assert.match(text,/jaula ya estaba alineada/i);
  assert.match(case007.nodes.find(({id})=>id==='c007-n-basilio')!.body,/Sira tendida.*sedación ligera/is);
});

test('las etiquetas de evidencia son únicas y no adelantan a la responsable',()=>{
  const labels=case007.clues.flatMap(({states})=>states.map(({label})=>label));
  assert.equal(new Set(labels).size,labels.length);
  const early=['c007-n-recinto','c007-n-clinica','c007-n-direccion','c007-n-central','c007-n-primates','c007-n-galeria','c007-n-archivo'];
  const byId=new Map(case007.nodes.map(node=>[node.id,node.body]));
  for(const id of early) assert.doesNotMatch(byId.get(id)!,/Leire (retiró|cargó|ocultó|trasladó)/i,id);
});

test('acertar la teoría al principio no resuelve el expediente',()=>{
  const state=visitNode(file,initialState(file.id),file.entryNodeId).state;
  assert.equal(canAccuse(file,state),false);
  assert.equal(judgeAccusation(file,accusation,state).verdict,'partial');
});
