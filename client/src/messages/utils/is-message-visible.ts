import { getVisibleElementHeight } from "./get-visible-element-height";

export const isMessageVisible = (
  messageElement: HTMLElement,
  container: HTMLElement
): boolean => {
  const totalHeight = messageElement.clientHeight;

  const visibleHeight = getVisibleElementHeight(messageElement, container);

  return visibleHeight > 0.8 * totalHeight;
};
