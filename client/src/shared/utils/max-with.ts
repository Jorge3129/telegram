export const maxWith = <T>(
  list: T[],
  compareFn: (a: T, b: T) => number
): T | undefined => {
  if (!list.length) {
    return undefined;
  }

  return list.reduce((currentMax, item) => {
    return compareFn(currentMax, item) >= 0 ? currentMax : item;
  });
};
