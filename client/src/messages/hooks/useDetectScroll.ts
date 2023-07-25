import { MutableRefObject, useRef } from "react";
import { useSelector } from "react-redux";
import { Message } from "../models/message.model";
import { selectCurrentChat } from "../../current-chat/reducers/current-chat.reducer";
import { getVisibleElementHeight } from "../utils/get-visible-element-height";
import { useEmitMessageRead } from "./use-emit-message-read";
import { MeasurableElement } from "../utils/measurable-element";

export const useDetectScroll = (
  scrollRef: MutableRefObject<HTMLDivElement | null>,
  messages: Message[]
) => {
  const { currentChat } = useSelector(selectCurrentChat);
  const readRef = useRef<string[]>([]);
  const topRef = useRef<number>(scrollRef.current?.scrollTop || 0);

  const emitReadEvent = useEmitMessageRead();

  const getVisibleMessageIds = (container: HTMLElement): string[] => {
    const messageElements = Array.from(
      document.querySelectorAll(".message_container")
    );

    const visibleIds = messageElements
      .filter((messageElement) => {
        const visibleHeight = getVisibleElementHeight(
          messageElement as HTMLElement,
          MeasurableElement.fromHtml(container)
        );

        return (
          visibleHeight > 0 && visibleHeight === messageElement.clientHeight
        );
      })
      .map((messageElement) => messageElement.id.replace(/message-/, ""));

    return visibleIds;
  };

  const getLastVisibleMessage = (
    container: HTMLElement
  ): string | undefined => {
    return getVisibleMessageIds(container).at(-1);
  };

  const handleScroll = () => {
    const unreadCount = currentChat?.unread;

    if (
      !unreadCount ||
      !scrollRef.current?.scrollTop ||
      topRef.current > scrollRef.current?.scrollTop
    ) {
      topRef.current = scrollRef.current?.scrollTop || 0;
      return;
    }

    topRef.current = scrollRef.current?.scrollTop || 0;

    const lastMessageId = getLastVisibleMessage(scrollRef.current);

    if (lastMessageId && lastMessageId !== [...readRef.current].pop()) {
      readRef.current.push(lastMessageId);

      const message = messages.find((msg) => msg.id === lastMessageId);

      if (message) {
        emitReadEvent(message);
      }
    }
  };

  return { handleScroll };
};
