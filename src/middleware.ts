/**
 * Guardia del panel de dirección.
 *
 * Todo lo que cuelga de `/admin` pasa por aquí. Si no hay `ADMIN_TOKEN`
 * configurado el panel responde 404 en vez de un formulario: en producción no
 * queremos anunciar que existe una puerta.
 */
import { defineMiddleware } from 'astro:middleware';
import { adminEnabled, isSignedIn } from '@lib/admin/session';

const LOGIN = '/admin/entrar';

export const onRequest = defineMiddleware((context, next) => {
  const { pathname } = context.url;
  const isAdmin = pathname === '/admin' || pathname.startsWith('/admin/');
  if (!isAdmin) return next();

  if (!adminEnabled()) return new Response('Expediente no encontrado', { status: 404 });
  if (pathname === LOGIN || isSignedIn(context.cookies)) return next();

  return context.redirect(LOGIN);
});
