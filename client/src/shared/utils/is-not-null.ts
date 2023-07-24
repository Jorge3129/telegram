export const isNotNullable = <T extends object>(
  arg: T | undefined | null
): arg is T => {
  return !!arg;
};
