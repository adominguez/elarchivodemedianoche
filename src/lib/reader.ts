/**
 * Identidad del lector.
 *
 * Todavía no hay cuentas. Una cookie firmada por el navegador basta para
 * reconocer la investigación en curso; el día que existan usuarios, este
 * módulo devolverá el id de la cuenta y el modelo de datos no cambiará
 * (`investigations.user_id` ya está previsto).
 */
import { randomUUID } from 'node:crypto';
import type { AstroCookies } from 'astro';

const COOKIE = 'archivo_lector';
const ONE_YEAR = 60 * 60 * 24 * 365;

export function readerKey(cookies: AstroCookies): string {
  const existing = cookies.get(COOKIE)?.value;
  if (existing) return existing;

  const key = randomUUID();
  cookies.set(COOKIE, key, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: import.meta.env.PROD,
    maxAge: ONE_YEAR,
  });
  return key;
}
