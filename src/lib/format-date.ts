// lib/format-date.ts
const fmt = (d: Date, opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat('en-GB', { timeZone: 'UTC', ...opts }).format(d);

/** Accepts a Date, an ISO string, or null/undefined → Date | null */
export function parseDate(value: Date | string | null | undefined): Date | null {
  if (value == null) return null;
  const d = value instanceof Date ? value : new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function formatDateRange(start: Date, end: Date): string {
  const sameYear = start.getUTCFullYear() === end.getUTCFullYear();
  const s = `${fmt(start, { day: 'numeric' })} ${fmt(start, { month: 'short' }).toUpperCase()}`;
  const e = `${fmt(end,   { day: 'numeric' })} ${fmt(end,   { month: 'short' }).toUpperCase()}`;
  const y = fmt(end, { year: 'numeric' });
  return sameYear
    ? `${s} – ${e} ${y}`
    : `${s} ${fmt(start, { year: 'numeric' })} – ${e} ${y}`;
}

export function formatCloseDate(d: Date): string {
  return fmt(d, { weekday: 'long', day: 'numeric', month: 'long' });
}