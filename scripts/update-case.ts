/** Actualización editorial con copia local y comprobación del progreso. */
import { mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { scriptClient } from './turso.ts';
import { case001 } from '../db/seeds/case-001-la-ultima-campanada.ts';
import { case002 } from '../db/seeds/case-002-la-senal-bajo-el-hielo.ts';
import { case003 } from '../db/seeds/case-003-la-puja-de-humo.ts';
await import('./migrate.ts');
const editorial=['cases','suspects','clues','clue_states','suspect_facts','case_nodes','node_effects','node_options','option_requirements','solution_options','case_solutions','solution_evidence','case_evidence_rules'];
const progress=['investigations','investigation_visits','investigation_clues','investigation_facts','investigation_flags','accusations'];
const client=scriptClient();
const tableNames=new Set((await client.execute("SELECT name FROM sqlite_master WHERE type='table'")).rows.map(r=>String(r.name)));
const snapshot: Record<string,unknown[]>={};
for(const table of [...editorial,...progress]) if(tableNames.has(table)) snapshot[table]=(await client.execute(`SELECT * FROM ${table}`)).rows;
for (const definition of [case001, case002, case003]) {
  for(const [table,ids] of [
    ['case_nodes',definition.nodes.map(n=>n.id)],['clues',definition.clues.map(c=>c.id)],
    ['suspects',definition.suspects.map(s=>s.id)],['suspect_facts',definition.suspects.flatMap(s=>s.facts.map(f=>f.id))],
  ] as const) {
    const survivors=new Set(ids);
    if((snapshot[table]??[]).some(r=>{const row=r as {case_id:string;id:string};return row.case_id===definition.id&&!survivors.has(row.id);})) throw new Error(`La edición elimina registros de ${table} en ${definition.id}; revisar antes de aplicar`);
  }
}
function digest(rows:unknown[]) {return createHash('sha256').update(rows.map(r=>JSON.stringify(r)).sort().join('\n')).digest('hex');}
await mkdir(new URL('../.data/backups/',import.meta.url),{recursive:true});
const path=new URL(`../.data/backups/before-cases-update-${Date.now()}.json`,import.meta.url);
await writeFile(path,JSON.stringify(snapshot,null,2),{mode:0o600});
console.log('✓ Copia de seguridad guardada en .data/backups/');
await import('./seed.ts');
if (process.exitCode) throw new Error('La definición no superó la validación; revisar los errores del seed');
for(const table of progress) {
  const after=(await client.execute(`SELECT * FROM ${table}`)).rows;
  if(digest(after)!==digest(snapshot[table]??[])) throw new Error(`El progreso de ${table} ha cambiado durante la actualización: comprobar copia de seguridad`);
}
client.close();
console.log('✓ Actualización aplicada; todas las tablas de progreso conservan su contenido.');
