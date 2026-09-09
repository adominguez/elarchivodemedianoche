/**
 * Resolución de la configuración de Turso.
 *
 * Este módulo es TypeScript plano y sin dependencias a propósito: lo comparten
 * la aplicación (que lee las variables vía `astro:env`) y los scripts de
 * `scripts/`, que se ejecutan con Node y leen `process.env`.
 */

export const LOCAL_DRAFT_URL = 'file:.data/archivo-medianoche.db';

export interface LibsqlConfig {
  url: string;
  authToken?: string;
  /** true cuando no hay credenciales de Turso y usamos el fichero de borrador. */
  isLocalDraft: boolean;
}

export interface ResolveOptions {
  url?: string;
  authToken?: string;
  /** Fuera de desarrollo, la ausencia de `TURSO_DATABASE_URL` es un error. */
  allowLocalDraft: boolean;
}

export function resolveLibsqlConfig({ url, authToken, allowLocalDraft }: ResolveOptions): LibsqlConfig {
  const trimmed = url?.trim();

  if (trimmed) {
    return { url: trimmed, authToken: authToken?.trim() || undefined, isLocalDraft: false };
  }

  if (!allowLocalDraft) {
    throw new Error(
      'Falta TURSO_DATABASE_URL. El almacenamiento del proyecto es Turso: ' +
        'define TURSO_DATABASE_URL (libsql://…) y TURSO_AUTH_TOKEN. Ver .env.example.',
    );
  }

  return { url: LOCAL_DRAFT_URL, isLocalDraft: true };
}
