export const getVisibleElementHeight = (
  element: HTMLElement,
  container: HTMLElement | null
): number => {
  if (!container) {
    return -1;
  }

  const scrollTop = container.scrollTop;
  const scrollBottom = scrollTop + container.clientHeight;

  const containerRect = container.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();

  const rect = {
    top: elementRect.top - containerRect.top,
  };

  const elementTop = rect.top + scrollTop;
  const elementBottom = elementTop + element.clientHeight;

  const visibleTop = elementTop < scrollTop ? scrollTop : elementTop;
  const visibleBottom =
    elementBottom > scrollBottom ? scrollBottom : elementBottom;

  return visibleBottom - visibleTop;
};
