/**
 * Acceso a la dirección del archivo.
 *
 * No hay cuentas todavía, así que tampoco hay usuarios administradores: el
 * panel se abre con un único `ADMIN_TOKEN` que vive en el entorno. Es
 * deliberadamente lo más pequeño que resuelve el problema; cuando existan
 * cuentas, este módulo pasará a comprobar un rol y nada más cambiará.
 *
 * La cookie no guarda el token, sino un derivado HMAC: si alguien la lee, no
 * obtiene la credencial con la que se abrió.
 */
import { createHash, createHmac, timingSafeEqual } from 'node:crypto';
import { ADMIN_TOKEN } from 'astro:env/server';
import type { AstroCookies } from 'astro';

const COOKIE = 'archivo_direccion';
const TWELVE_HOURS = 60 * 60 * 12;

/** Sin token configurado el panel no existe: ni login, ni rutas, ni pistas. */
export function adminEnabled(): boolean {
  return typeof ADMIN_TOKEN === 'string' && ADMIN_TOKEN.trim().length > 0;
}

function token(): string {
  const value = ADMIN_TOKEN?.trim();
  if (!value) throw new Error('ADMIN_TOKEN no está configurado.');
  return value;
}

/**
 * Comparación en tiempo constante. Se comparan los digest y no los textos
 * porque `timingSafeEqual` exige la misma longitud, y la longitud del token
 * tecleado es justo lo que no queremos filtrar.
 */
function sameSecret(a: string, b: string): boolean {
  const left = createHash('sha256').update(a).digest();
  const right = createHash('sha256').update(b).digest();
  return timingSafeEqual(left, right);
}

function sessionValue(): string {
  return createHmac('sha256', token()).update('direccion-del-archivo/v1').digest('hex');
}

export function tokenMatches(candidate: string): boolean {
  if (!adminEnabled() || candidate === '') return false;
  return sameSecret(candidate, token());
}

export function isSignedIn(cookies: AstroCookies): boolean {
  if (!adminEnabled()) return false;
  const value = cookies.get(COOKIE)?.value;
  if (!value) return false;
  return sameSecret(value, sessionValue());
}

export function openSession(cookies: AstroCookies): void {
  cookies.set(COOKIE, sessionValue(), {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: import.meta.env.PROD,
    maxAge: TWELVE_HOURS,
  });
}

export function closeSession(cookies: AstroCookies): void {
  cookies.delete(COOKIE, { path: '/' });
}
