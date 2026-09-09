/**
 * Aplica `db/schema.sql` sobre Turso. El esquema es idempotente
 * (`CREATE TABLE IF NOT EXISTS`), así que puede ejecutarse las veces que haga falta.
 *
 *   pnpm db:migrate
 */
import { readFile, mkdir } from 'node:fs/promises';
import { scriptClient } from './turso.ts';

const schema = await readFile(new URL('../db/schema.sql', import.meta.url), 'utf8');

// El borrador local necesita que exista el directorio antes de abrir el fichero.
await mkdir(new URL('../.data/', import.meta.url), { recursive: true });

const client = scriptClient();
await client.executeMultiple(schema);

const { rows } = await client.execute(
  `SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' ORDER BY name`,
);
console.log(`✓ Esquema aplicado. ${rows.length} tablas:`);
console.log(rows.map((row) => `  · ${String(row.name)}`).join('\n'));
client.close();
