/** Cierra la sesión del panel y devuelve al lector a la puerta. */
import type { APIRoute } from 'astro';
import { closeSession } from '@lib/admin/session';

export const POST: APIRoute = ({ cookies, redirect }) => {
  closeSession(cookies);
  return redirect('/admin/entrar');
};
