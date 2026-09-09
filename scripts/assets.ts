/**
 * Inventario de imágenes de un expediente.
 *
 * Lee los `publicId` que Turso tiene guardados (la fuente de verdad, no el
 * seed) y comprueba contra Cloudinary cuáles están ya subidos. Sirve para saber
 * qué queda por producir sin abrir la biblioteca de medios.
 *
 *   pnpm assets            → todos los expedientes
 *   pnpm assets <slug>     → sólo uno
 */
import { scriptClient } from './turso.ts';

const slug = process.argv[2];
const cloud = process.env.CLOUDINARY_CLOUD_NAME?.trim();

if (!cloud) {
  console.error('Falta CLOUDINARY_CLOUD_NAME. Ver .env.example.');
  process.exit(1);
}

const client = scriptClient();

const { rows } = await client.execute({
  sql: `SELECT c.slug, 'portada'     AS grupo, c.title      AS nombre, c.cover_public_id      AS public_id FROM cases c
        UNION ALL
        SELECT c.slug, 'sospechosos' AS grupo, s.name       AS nombre, s.portrait_public_id   AS public_id
          FROM suspects s JOIN cases c ON c.id = s.case_id
        UNION ALL
        SELECT c.slug, 'pruebas'     AS grupo, cl.name      AS nombre, cl.image_public_id     AS public_id
          FROM clues cl JOIN cases c ON c.id = cl.case_id
        UNION ALL
        SELECT c.slug, 'escenas'     AS grupo, n.title      AS nombre, n.image_public_id      AS public_id
          FROM case_nodes n JOIN cases c ON c.id = n.case_id
        ORDER BY slug, grupo, nombre`,
  args: [],
});

const wanted = rows
  .filter((row) => row.public_id !== null && (!slug || row.slug === slug))
  .map((row) => ({
    slug: String(row.slug),
    grupo: String(row.grupo),
    nombre: String(row.nombre),
    publicId: String(row.public_id),
  }));

client.close();

if (wanted.length === 0) {
  console.log(slug ? `Sin imágenes declaradas para "${slug}".` : 'Sin imágenes declaradas.');
  process.exit(0);
}

async function exists(publicId: string): Promise<boolean> {
  const url = `https://res.cloudinary.com/${cloud}/image/upload/f_auto,q_auto,w_60/${publicId}`;
  try {
    const response = await fetch(url, { method: 'GET', headers: { Range: 'bytes=0-0' } });
    return response.ok || response.status === 206;
  } catch {
    return false;
  }
}

const results = await Promise.all(
  wanted.map(async (asset) => ({ ...asset, subida: await exists(asset.publicId) })),
);

let grupo = '';
for (const asset of results) {
  if (asset.grupo !== grupo) {
    grupo = asset.grupo;
    console.log(`\n${grupo.toUpperCase()}`);
  }
  console.log(`  ${asset.subida ? '✓' : '·'} ${asset.publicId}${asset.subida ? '' : `   (${asset.nombre})`}`);
}

const pending = results.filter((asset) => !asset.subida).length;
console.log(
  `\n${results.length - pending} de ${results.length} subidas a Cloudinary (${cloud}).` +
    (pending > 0 ? ` Faltan ${pending}.` : ' Completo.'),
);
