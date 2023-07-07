export const initials = (title: string): string => {
  const tokens = title.split(" ");

  return tokens
    .slice(0, 2)
    .map((t) => t.split("")[0])
    .join("")
    .toUpperCase();
};
