/**
 * Utilidades de mapeo fila → dominio.
 *
 * libSQL devuelve valores sin tipar; estas funciones son el único sitio donde
 * se hacen las conversiones, para que los repositorios queden legibles.
 */
import type { Row, Value } from '@libsql/client';

export function str(value: Value): string {
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'bigint') return String(value);
  throw new Error(`Se esperaba texto y llegó ${typeof value}`);
}

export function strOrNull(value: Value): string | null {
  if (value === null || value === undefined) return null;
  return str(value);
}

export function num(value: Value): number {
  if (typeof value === 'number') return value;
  if (typeof value === 'bigint') return Number(value);
  if (typeof value === 'string') return Number(value);
  throw new Error(`Se esperaba número y llegó ${typeof value}`);
}

export function bool(value: Value): boolean {
  return num(value) !== 0;
}

/** Agrupa filas por una clave, conservando el orden de llegada. */
export function groupBy<T>(rows: readonly Row[], key: (row: Row) => string, map: (row: Row) => T) {
  const grouped = new Map<string, T[]>();
  for (const row of rows) {
    const id = key(row);
    const bucket = grouped.get(id);
    if (bucket) bucket.push(map(row));
    else grouped.set(id, [map(row)]);
  }
  return grouped;
}

/** El cuerpo narrativo se guarda como texto y se sirve en párrafos. */
export function paragraphs(body: string): string[] {
  return body
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}
