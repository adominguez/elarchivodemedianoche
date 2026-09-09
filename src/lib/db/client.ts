import { createClient, type Client } from '@libsql/client';
import { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN } from 'astro:env/server';
import { resolveLibsqlConfig } from './connection';

/**
 * Único punto de acceso a Turso en toda la aplicación.
 *
 * Ningún componente ni página debe importar `@libsql/client` directamente:
 * el SQL vive en `src/lib/data/*`.
 */
let client: Client | undefined;

export function db(): Client {
  if (client) return client;

  const config = resolveLibsqlConfig({
    url: TURSO_DATABASE_URL,
    authToken: TURSO_AUTH_TOKEN,
    allowLocalDraft: import.meta.env.DEV,
  });

  if (config.isLocalDraft) {
    console.warn(
      `[archivo] Sin credenciales de Turso: usando el borrador local ${config.url}. ` +
        'Configura TURSO_DATABASE_URL antes de desplegar.',
    );
  }

  client = createClient({ url: config.url, authToken: config.authToken });
  return client;
}
