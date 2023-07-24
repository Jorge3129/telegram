import { useEffect, RefObject } from "react";
import { MessageScrollEvent } from "../components/message-list/MessageList";
import { MeasurableElement } from "../utils/measurable-element";

export const useEmitFirstMessagesView = <TElement extends HTMLElement>(
  wrapperRef: RefObject<TElement>,
  emitScrollEvent: (event: MessageScrollEvent) => void
) => {
  useEffect(() => {
    if (wrapperRef.current) {
      emitScrollEvent({
        event: null,
        container: MeasurableElement.fromHtml(wrapperRef.current),
      });
    }
  }, [wrapperRef, emitScrollEvent]);

  return {
    wrapperRef,
  };
};
