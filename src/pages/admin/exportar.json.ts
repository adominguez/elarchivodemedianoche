/**
 * Volcado plano de la telemetría, para analizarla fuera del panel.
 * El middleware ya exige sesión: aquí sólo se sirve.
 */
import type { APIRoute } from 'astro';
import { exportTelemetry } from '@lib/data/telemetryRepository';

export const GET: APIRoute = async () => {
  const payload = await exportTelemetry();
  const day = new Date().toISOString().slice(0, 10);

  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'content-disposition': `attachment; filename="archivo-medianoche-telemetria-${day}.json"`,
      'cache-control': 'no-store',
    },
  });
};
