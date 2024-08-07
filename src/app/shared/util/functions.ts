// Picks specified keys from an object, by filtering an array of Object.entries
// A key in Object.entries is always a string, hence the keys array is first mapped to strings
export const pick = (object: object, keys: (number | string)[]) =>
  Object.fromEntries(
    Object.entries(object).filter(([key]) =>
      keys.map((key) => key.toString()).includes(key),
    ),
  );

export const split = (
  // Split a comma separated value list, possibly apply a transform function
  data: string,
  transfromFunction: (key: string) => number | string = (value) => value,
) =>
  data.length
    ? data.split(`,`).map((value) => transfromFunction(value.trim()))
    : [];
