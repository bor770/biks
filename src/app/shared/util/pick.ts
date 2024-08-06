export const pick = (object: object, keys: (number | string)[]) =>
  Object.fromEntries(
    Object.entries(object).filter(([key]) =>
      keys.map((key) => key.toString()).includes(key),
    ),
  );
