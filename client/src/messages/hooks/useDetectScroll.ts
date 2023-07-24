import { MutableRefObject, useRef } from "react";
import { useSelector } from "react-redux";
import { Message } from "../models/message.model";
import { selectCurrentChat } from "../../current-chat/reducers/current-chat.reducer";
import { getVisibleElementHeight } from "../utils/get-visible-element-height";
import { useEmitMessageRead } from "./use-emit-message-read";

export const useDetectScroll = (
  scrollRef: MutableRefObject<HTMLDivElement | null>,
  messages: Message[]
) => {
  const { currentChat } = useSelector(selectCurrentChat);
  const readRef = useRef<string[]>([]);
  const topRef = useRef<number>(scrollRef.current?.scrollTop || 0);

  const emitReadEvent = useEmitMessageRead();

  const getVisibleMessageIds = (): string[] => {
    const divs = Array.from(document.querySelectorAll(".message_container"));

    const visible = divs
      .filter((el) => {
        const seen = getVisibleElementHeight(
          el as HTMLElement,
          scrollRef.current
        );
        return seen > 0 && seen === el.clientHeight;
      })
      .map((el) => el.id.replace(/message-/, ""));

    return visible;
  };

  const getLastVisibleMessage = (): string | undefined =>
    [...getVisibleMessageIds()].pop();

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

    const lastMessageId = getLastVisibleMessage();

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
