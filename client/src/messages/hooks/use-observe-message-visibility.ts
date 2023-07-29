import { RefObject, useEffect } from "react";
import { Message } from "../models/message.model";

export const useObserveMessageVisibility = (
  observer: IntersectionObserver | null,
  message: Message,
  messageRef: RefObject<HTMLElement>
) => {
  useEffect(() => {
    const messageElement = messageRef.current;

    const currentObserver = observer;

    if (!currentObserver || !messageElement) {
      return;
    }

    if (message.isReadByCurrentUser || message.isCurrentUserAuthor) {
      return;
    }

    currentObserver.observe(messageRef.current);

    return () => currentObserver.unobserve(messageElement);
  }, [
    observer,
    messageRef,
    message.isReadByCurrentUser,
    message.isCurrentUserAuthor,
  ]);
};
