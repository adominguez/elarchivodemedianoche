import type { CaseDefinition } from '../db/seeds/definition.ts';
import type { CaseFile, InvestigationState } from '../src/lib/domain/types.ts';
export function fromDefinition(d: CaseDefinition): CaseFile {
  return {
    ...d, subtitle: d.subtitle ?? null, place: d.place ?? null, dateLabel: d.dateLabel ?? null,
    victimName: d.victimName ?? null, coverPublicId: d.coverPublicId ?? null,
    suspects: d.suspects.map(s => ({...s, portraitPublicId:s.portraitPublicId??null, relation:s.relation??null, facts:s.facts.map(f=>({...f,suspectId:s.id}))})),
    clues:d.clues.map(c=>({...c,imagePublicId:c.imagePublicId??null,foundAt:c.foundAt??null})),
    nodes:Object.fromEntries(d.nodes.map(n=>[n.id,{...n,location:n.location??null,body:n.body.split('\n\n'),imagePublicId:n.imagePublicId??null,imageCaption:n.imageCaption??null,effects:(n.effects??[]).map(e=>({...e,targetId:e.target,value:'value' in e?e.value??null:null}))}])),
    options:d.options.map(o=>({...o,sourceNodeId:o.from??null,targetNodeId:o.to,hint:o.hint??null,line:o.line??null,repeatable:o.repeatable??false,requirements:(o.requires??[]).map(r=>({...r,targetId:r.target,value:'value' in r?r.value??null:null}))})),
    solutionOptions:[...d.motives.map(m=>({...m,dimension:'motive' as const})),...d.methods.map(m=>({...m,dimension:'method' as const}))],
    solution:{culpritSuspectId:d.solution.culprit,motiveOptionId:d.solution.motive,methodOptionId:d.solution.method,explanation:d.solution.explanation,epitaph:d.solution.epitaph??null,evidenceClueIds:d.solution.evidence,evidenceGroups:d.solution.evidenceGroups},
  };
}
export function initialState(caseId: string): InvestigationState {
  return {id:'test',caseId,status:'open',currentNodeId:null,visitedNodeIds:new Set(),clueStates:new Map(),discoveredFactIds:new Set(),flags:new Map()};
}
