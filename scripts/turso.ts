/**
 * Cliente de Turso para los scripts de mantenimiento (Node, fuera de Astro).
 * Comparte con la aplicación la resolución de configuración.
 */
import { createClient, type Client } from '@libsql/client';
import { resolveLibsqlConfig } from '../src/lib/db/connection.ts';

export function scriptClient(): Client {
  const config = resolveLibsqlConfig({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
    allowLocalDraft: true,
  });

  console.log(
    config.isLocalDraft
      ? `→ Sin TURSO_DATABASE_URL: trabajando sobre el borrador local ${config.url}`
      : `→ Turso: ${config.url}`,
  );

  return createClient({ url: config.url, authToken: config.authToken });
}
