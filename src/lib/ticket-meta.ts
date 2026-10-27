
/** Normalize so "Grand Noël" / "GRAND NOEL" / "grand noel" all match. */
export const normalizeName = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // strip ë → e
    .toLowerCase()
    .trim();

/** guest count per ticket name (normalized) */
const GUESTS_BY_TICKET: Record<string, number> = {
  'golden quartet': 4,
  'grand noel':  6,
  'prestige pass': 2,
};

export const guestsForTicket = (name: string): number | null =>
  GUESTS_BY_TICKET[normalizeName(name)] ?? null;

const WORDS = ['zero','one','two','three','four','five','six','seven','eight','nine','ten'];
export const numberToWord = (n: number) =>
  Number.isInteger(n) && n >= 0 && n <= 10 ? WORDS[n] : String(n);