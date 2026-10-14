export function serializeDates<T extends Record<string, unknown>>(
  obj: T,
  fields: (keyof T)[],
): T {
  const out = { ...obj };
  for (const field of fields) {
    const value = out[field];
    if (value instanceof Date) {
      (out as any)[field] = value.toISOString();
    } else if (value === undefined) {
      (out as any)[field] = null;
    }
  }
  return out;
}