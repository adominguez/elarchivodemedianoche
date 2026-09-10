/**
 * Aritmética del panel de dirección.
 *
 * Funciones puras: no tocan Turso ni Astro. Aquí vive todo lo que se puede
 * equivocar en silencio (porcentajes sobre cero, fechas de SQLite leídas como
 * hora local) para poder probarlo sin levantar nada.
 */

/** Porcentaje entero de `part` sobre `total`. Sin total no hay porcentaje. */
export function share(part: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round((part / total) * 100);
}

/**
 * SQLite escribe `datetime('now')` como `YYYY-MM-DD HH:MM:SS` en UTC y sin
 * zona. Si se le pasa tal cual a `new Date`, el navegador lo interpreta como
 * hora local y el "hace 2 horas" sale desplazado. Aquí se marca como UTC.
 */
export function parseSqlDate(value: string | null): Date | null {
  if (!value) return null;
  const normalised = value.includes('T') ? value : value.replace(' ', 'T');
  const withZone = /[Zz]|[+-]\d{2}:?\d{2}$/.test(normalised) ? normalised : `${normalised}Z`;
  const date = new Date(withZone);
  return Number.isNaN(date.getTime()) ? null : date;
}

/** "hace 3 h", "hace 2 días". Para leer una tabla de un vistazo. */
export function timeAgo(value: string | null, now: Date = new Date()): string {
  const date = parseSqlDate(value);
  if (!date) return '—';

  const minutes = Math.round((now.getTime() - date.getTime()) / 60000);
  if (minutes < 1) return 'ahora mismo';
  if (minutes < 60) return `hace ${minutes} min`;

  const hours = Math.round(minutes / 60);
  if (hours < 24) return `hace ${hours} h`;

  const days = Math.round(hours / 24);
  if (days < 30) return `hace ${days} ${days === 1 ? 'día' : 'días'}`;

  const months = Math.round(days / 30);
  return `hace ${months} ${months === 1 ? 'mes' : 'meses'}`;
}

/** Duraciones de lectura: minutos crudos → "1 h 12 min". */
export function formatMinutes(minutes: number | null): string {
  if (minutes === null || !Number.isFinite(minutes) || minutes <= 0) return '—';
  if (minutes < 60) return `${Math.round(minutes)} min`;
  const hours = Math.floor(minutes / 60);
  const rest = Math.round(minutes % 60);
  return rest === 0 ? `${hours} h` : `${hours} h ${rest} min`;
}

/**
 * La cookie del lector es un UUID. En el panel no aporta nada entera y ocupa
 * media tabla: basta el prefijo para distinguir a dos lectores.
 */
export function maskReader(readerKey: string): string {
  return readerKey.slice(0, 8);
}

/** Longitud de barra para las listas comparativas, siempre visible si hay algo. */
export function barWidth(value: number, max: number): number {
  if (max <= 0 || value <= 0) return 0;
  return Math.max(2, Math.round((value / max) * 100));
}

export type Severity = 'ok' | 'warn' | 'alert';

/**
 * Semáforo de una pista: que una prueba que sostiene la solución no la
 * encuentre casi nadie es un problema de diseño del caso, no una curiosidad.
 */
export function clueSeverity(found: number, started: number, isEvidence: boolean): Severity {
  if (started === 0) return 'ok';
  const reach = share(found, started);
  if (isEvidence && reach < 50) return 'alert';
  if (reach === 0) return 'alert';
  if (reach < 25) return 'warn';
  return 'ok';
}

/**
 * Modelo de presentación de las listas comparativas del panel.
 *
 * Vive aquí y no en el frontmatter de `BarList.astro` porque un `.astro` no
 * exporta tipos de forma fiable, y las páginas necesitan construir estas listas
 * antes de pintarlas.
 */
export interface BarItem {
  label: string;
  value: number;
  note?: string;
  tone?: 'neutral' | 'good' | 'warn' | 'alert';
}
