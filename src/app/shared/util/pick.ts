export const pick = (object: object, keys: unknown[]) =>
  Object.fromEntries(
    Object.entries(object).filter(([key]) => keys.includes(key)),
  );
