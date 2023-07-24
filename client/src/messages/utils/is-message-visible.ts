import { getVisibleElementHeight } from "./get-visible-element-height";
import { MeasurableElement } from "./measurable-element";

export const isMessageVisible = (
  messageElement: HTMLElement,
  container: MeasurableElement
): boolean => {
  const totalHeight = messageElement.clientHeight;

  const visibleHeight = getVisibleElementHeight(messageElement, container);

  return visibleHeight > 0.8 * totalHeight;
};
