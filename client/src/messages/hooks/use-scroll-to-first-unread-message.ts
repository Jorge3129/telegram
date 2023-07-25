import { RefObject, useCallback } from "react";
import { useSelector } from "react-redux";
import { useSubscribeObservable } from "../../shared/hooks/use-subscribe-observable";
import { messagesFetched$ } from "../state/fetch-messages-thunk";
import { Message } from "../models/message.model";
import { selectMessages } from "../state/messages.reducer";
import { Chat } from "../../chats/models/chat.model";

const getLatestReadMessage = (
  messages: Message[],
  unreadCount: number
): Message | undefined => {
  const lastMessageIndex = messages.length - unreadCount - 1;

  return messages[lastMessageIndex];
};

export const useScrollToFirstUnreadMessage = <TElement extends HTMLElement>(
  currentChat: Chat,
  message: Message,
  messageRef: RefObject<TElement>
) => {
  const { loading: messagesLoading } = useSelector(selectMessages);

  const handleFirstMessageFetch = useCallback(
    (messages: Message[]) => {
      const messageElement = messageRef.current;

      if (
        !messageElement ||
        messagesLoading ||
        messages.length < currentChat.unread
      ) {
        return;
      }

      const lastMessage = getLatestReadMessage(messages, currentChat.unread);

      if (message.id === lastMessage?.id) {
        messageElement.scrollIntoView();
      }
    },
    [currentChat, messagesLoading, message.id, messageRef]
  );

  useSubscribeObservable(messagesFetched$, handleFirstMessageFetch);
};
