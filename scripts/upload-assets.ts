/** Publica las regiones del atlas aprobado como recursos independientes.
 * pnpm assets:upload .data/art/la-ultima-campanada/manifest.json
 * Cloudinary conserva una copia anterior al sobrescribir; no imprime secretos.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve, dirname } from 'node:path';
import { case001 } from '../db/seeds/case-001-la-ultima-campanada.ts';
import { case002 } from '../db/seeds/case-002-la-senal-bajo-el-hielo.ts';
import { case003 } from '../db/seeds/case-003-la-puja-de-humo.ts';
interface Asset { publicId: string; source: string; region?: [number, number, number, number] }
const manifestPath = resolve(process.argv[2] ?? '.data/art/la-ultima-campanada/manifest.json');
const assets: Asset[] = JSON.parse(await readFile(manifestPath, 'utf8'));
const definitions = [case001, case002, case003];
const caseDefinition = definitions.find((definition) =>
  assets.every((asset) => asset.publicId.startsWith(`archivos-de-medianoche/${definition.slug}/`)),
);
if (!caseDefinition) throw new Error('El manifiesto no pertenece a un expediente conocido');
const wanted = new Set([caseDefinition.coverPublicId,...caseDefinition.suspects.map(s=>s.portraitPublicId),...caseDefinition.clues.map(c=>c.imagePublicId),...caseDefinition.nodes.map(n=>n.imagePublicId)].filter(Boolean));
if (assets.length !== wanted.size || new Set(assets.map(a=>a.publicId)).size !== wanted.size || assets.some(a=>!wanted.has(a.publicId))) throw new Error('El manifiesto no coincide con los recursos del expediente');
const cloud=process.env.CLOUDINARY_CLOUD_NAME, key=process.env.CLOUDINARY_API_KEY, secret=process.env.CLOUDINARY_API_SECRET;
if (!cloud || !key || !secret) throw new Error('Falta configuración de Cloudinary');
const uploadedPath=resolve(dirname(manifestPath),'uploaded.json');
interface UploadedAsset { publicId?:string; url?:string; width?:number; height?:number; version?:number }
let results: UploadedAsset[]=[];
try {
  const previous=JSON.parse(await readFile(uploadedPath,'utf8')) as UploadedAsset[];
  const wantedIds=new Set(assets.map(asset=>asset.publicId));
  results=previous.filter(item=>item.publicId && wantedIds.has(item.publicId));
} catch {
  // Primera ejecución: todavía no existe un registro reanudable.
}
for (const asset of assets) {
  if(results.some(result=>result.publicId===asset.publicId)) {
    console.log(`↷ ${asset.publicId} (ya subida)`);
    continue;
  }
  const bytes=await readFile(resolve(dirname(manifestPath),asset.source));
  const parameters: Record<string,string>={timestamp:String(Math.floor(Date.now()/1000)),public_id:asset.publicId,overwrite:'true',invalidate:'true',backup:'true'};
  if(asset.region) {
    const [x,y,w,h]=asset.region;
    if (![x,y,w,h].every(Number.isInteger) || x<0 || y<0 || w<1 || h<1) throw new Error('Región inválida');
    parameters.transformation=`c_crop,g_north_west,x_${x},y_${y},w_${w},h_${h}`;
  }
  const signature=createHash('sha1').update(Object.keys(parameters).sort().map(k=>`${k}=${parameters[k]}`).join('&')+secret).digest('hex');
  const form=new FormData();
  for(const [k,v] of Object.entries(parameters)) form.set(k,v);
  form.set('api_key',key);form.set('signature',signature);form.set('file',new Blob([bytes],{type:'image/png'}),'asset.png');
  const response=await fetch(`https://api.cloudinary.com/v1_1/${cloud}/image/upload`,{method:'POST',body:form});
  const result=await response.json() as {public_id?:string;secure_url?:string;width?:number;height?:number;version?:number;error?:{message?:string}};
  if(!response.ok || result.public_id!==asset.publicId) throw new Error(`Subida fallida ${asset.publicId}: ${result.error?.message??response.status}`);
  results.push({publicId:result.public_id,url:result.secure_url,width:result.width,height:result.height,version:result.version});
  await writeFile(uploadedPath,JSON.stringify(results,null,2));
  console.log(`✓ ${asset.publicId} (${result.width}×${result.height})`);
}
