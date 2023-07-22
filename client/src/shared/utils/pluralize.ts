export const pluralize = (
  quantity: number,
  singular: string,
  plural?: string
): string => {
  const actualPlural = plural || `${singular}s`;

  return quantity === 1 ? singular : actualPlural;
};

export const formatWithQuantity = (quantity: number, name: string): string => {
  return `${quantity} ${pluralize(quantity, name)}`;
};
