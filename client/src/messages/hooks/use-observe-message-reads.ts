import _ from "lodash";
import { RefObject, useCallback, useEffect, useState } from "react";
import { isNotNullable } from "../../shared/utils/is-not-null";
import { Message } from "../models/message.model";
import { useEmitLocalMessageRead } from "./use-emit-local-message-read";
import { useMessageReadsQueue } from "./use-message-reads-queue";
import { findLatestMessage } from "../utils/find-latest-message";

export const useObserveMessageReads = (
  messageListRef: RefObject<HTMLElement>,
  messages: Message[],
  messagesLoading: boolean
) => {
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);

  const emitLocalReadEvent = useEmitLocalMessageRead();
  const { emitMessageRead } = useMessageReadsQueue();

  const handleIntersectionChange = useCallback(
    (
      entries: IntersectionObserverEntry[],
      messagesMap: Record<string, Message>
    ) => {
      const readMessages = entries
        .filter((entry) => entry.isIntersecting)
        .map((entry) => {
          const messageId = entry.target.getAttribute("data-message-id");

          if (!messageId) {
            return null;
          }

          return messagesMap[messageId];
        })
        .filter(isNotNullable)
        .filter(
          (message) =>
            !message.isReadByCurrentUser && !message.isCurrentUserAuthor
        );

      const latestMessage = findLatestMessage(readMessages);

      if (!latestMessage) {
        return;
      }

      emitLocalReadEvent(latestMessage);
      emitMessageRead(latestMessage);
    },
    [emitLocalReadEvent, emitMessageRead]
  );

  useEffect(() => {
    const containerRef = messageListRef.current;

    if (!containerRef || messagesLoading) {
      return;
    }

    const messagesMap = _.keyBy(messages, "id");

    const newObserver = new IntersectionObserver(
      (entries) => handleIntersectionChange(entries, messagesMap),
      {
        root: containerRef,
        threshold: [0.8],
      }
    );

    setObserver(newObserver);

    return () => newObserver.disconnect();
  }, [
    messageListRef,
    messagesLoading,
    messages.length,
    handleIntersectionChange,
  ]);

  return { observer };
};
