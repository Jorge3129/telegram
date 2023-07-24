export const getVisibleElementHeight = (
  element: HTMLElement,
  container: HTMLElement
): number => {
  const containerTop = container.scrollTop;
  const containerBottom = containerTop + container.clientHeight;

  const containerRect = container.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();

  const elementRelativeTop = elementRect.top - containerRect.top + containerTop;
  const elementRelativeBottom = elementRelativeTop + elementRect.height;

  const visibleTop = Math.max(elementRelativeTop, containerTop);
  const visibleBottom = Math.min(elementRelativeBottom, containerBottom);

  return Math.max(0, visibleBottom - visibleTop);
};
