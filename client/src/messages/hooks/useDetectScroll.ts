import { MutableRefObject, useRef } from "react";
import { selectChats, ChatActions } from "../../chats/chats.reducer";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/store";
import { Socket } from "socket.io-client";
import { selectUser } from "../../redux/user-reducer";
import { Message } from "../models/message.model";
import { selectCurrentChat } from "../../current-chat/reducers/current-chat.reducer";
import { getVisibleElementHeight } from "../utils/get-visible-element-height";
import { isMessageSeen } from "../../utils/is-message-seen";
import { messageApiService } from "../messages-api.service";

export const useDetectScroll = (
  socket: Socket | null,
  scrollRef: MutableRefObject<HTMLDivElement | null>,
  messages: Message[]
) => {
  const { chats } = useSelector(selectChats);
  const { currentChatId, currentChat } = useSelector(selectCurrentChat);
  const dispatch = useAppDispatch();
  const readRef = useRef<string[]>([]);
  const topRef = useRef<number>(scrollRef.current?.scrollTop || 0);

  const { user } = useSelector(selectUser);

  const getVisibleMessageIds = (): string[] => {
    const divs = Array.from(document.querySelectorAll(".message_container"));

    const visible = divs
      .filter((el) => {
        const seen = getVisibleElementHeight(el, scrollRef.current);
        return seen > 0 && seen === el.clientHeight;
      })
      .map((el) => el.id.replace(/message-/, ""));

    return visible;
  };

  const getLastVisibleMessage = (): string | undefined =>
    [...getVisibleMessageIds()].pop();

  const emitReadEvent = (message: Message): void => {
    if (
      !currentChat ||
      isMessageSeen(message.timestamp, currentChat.unread, messages)
    ) {
      return;
    }

    const index = messages.indexOf(message);

    dispatch(
      ChatActions.setUnread({
        unread: messages.slice(index + 1).length,
        chatId: currentChatId || -1,
      })
    );

    if (!socket || !user) {
      return;
    }

    void messageApiService.updateMessageReads(message);
  };

  const handleScroll = () => {
    const unreadCount = chats.find((ch) => ch.id === currentChatId)?.unread;

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
