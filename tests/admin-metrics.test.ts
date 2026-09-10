import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  barWidth,
  clueSeverity,
  formatMinutes,
  maskReader,
  parseSqlDate,
  share,
  timeAgo,
} from '../src/lib/admin/metrics.ts';

test('un porcentaje sobre cero es cero, no una división indefinida', () => {
  assert.equal(share(0, 0), 0);
  assert.equal(share(5, 0), 0);
  assert.equal(share(1, 3), 33);
  assert.equal(share(3, 3), 100);
});

test('las fechas de SQLite se leen como UTC, no como hora local', () => {
  const parsed = parseSqlDate('2026-09-10 12:00:00');
  assert.equal(parsed?.toISOString(), '2026-09-10T12:00:00.000Z');
  // Si ya trae zona, se respeta.
  assert.equal(parseSqlDate('2026-09-10T12:00:00Z')?.toISOString(), '2026-09-10T12:00:00.000Z');
  assert.equal(parseSqlDate(null), null);
  assert.equal(parseSqlDate('no es una fecha'), null);
});

test('el tiempo transcurrido se cuenta desde la hora UTC guardada', () => {
  const now = new Date('2026-09-10T12:00:00Z');
  assert.equal(timeAgo('2026-09-10 11:58:00', now), 'hace 2 min');
  assert.equal(timeAgo('2026-09-10 09:00:00', now), 'hace 3 h');
  assert.equal(timeAgo('2026-09-08 12:00:00', now), 'hace 2 días');
  assert.equal(timeAgo('2026-09-09 12:00:00', now), 'hace 1 día');
  assert.equal(timeAgo(null, now), '—');
});

test('las duraciones se leen en horas y minutos', () => {
  assert.equal(formatMinutes(null), '—');
  assert.equal(formatMinutes(0), '—');
  assert.equal(formatMinutes(42.4), '42 min');
  assert.equal(formatMinutes(120), '2 h');
  assert.equal(formatMinutes(72), '1 h 12 min');
});

test('una barra con valor visible nunca se dibuja invisible', () => {
  assert.equal(barWidth(0, 10), 0);
  assert.equal(barWidth(1, 1000), 2, 'un valor mínimo sigue viéndose');
  assert.equal(barWidth(5, 10), 50);
  assert.equal(barWidth(10, 0), 0);
});

test('una prueba que sostiene la solución se marca si no llega a la mitad', () => {
  // Prueba esencial encontrada por 4 de 10: la acusación correcta no puede acreditarse.
  assert.equal(clueSeverity(4, 10, true), 'alert');
  assert.equal(clueSeverity(6, 10, true), 'ok');
  // Una pista secundaria sólo alarma si no la encuentra nadie.
  assert.equal(clueSeverity(0, 10, false), 'alert');
  assert.equal(clueSeverity(2, 10, false), 'warn');
  assert.equal(clueSeverity(9, 10, false), 'ok');
  // Sin lecturas no hay diagnóstico posible.
  assert.equal(clueSeverity(0, 0, true), 'ok');
});

test('la clave del lector se enmascara al prefijo', () => {
  assert.equal(maskReader('0f8e6a12-3b4c-4d5e-9f01-abcdef123456'), '0f8e6a12');
});
