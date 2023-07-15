export const classIf = (condition: boolean, className: string) => {
  return condition ? ` ${className}` : " ";
};
