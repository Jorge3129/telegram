import { useCallback } from "react";
import { useSelector } from "react-redux";
import { selectCurrentChat } from "../../current-chat/reducers/current-chat.reducer";
import { useSubscribeObservable } from "../../shared/hooks/use-subscribe-observable";
import { messagesFetched$ } from "../state/fetch-messages-thunk";
import { Message } from "../models/message.model";
import { selectMessages } from "../state/messages.reducer";

// TODO refactor this logic
export const useScrollToFirstUnreadMessage = () => {
  const { loading: messagesLoading } = useSelector(selectMessages);
  const { currentChat } = useSelector(selectCurrentChat);

  const handleFirstMessageFetch = useCallback(
    (messages: Message[]) => {
      if (
        !currentChat ||
        messagesLoading ||
        messages.length < currentChat.unread
      ) {
        return;
      }

      const lastMessageIndex = messages.length - currentChat.unread;

      const lastMessage = messages[lastMessageIndex];

      const lastMessageId = lastMessage?.id;

      const lastMessageElement = document.getElementById(
        `message-${lastMessageId || ""}`
      );

      if (!lastMessageElement) {
        return;
      }

      lastMessageElement.scrollIntoView();
    },
    [currentChat, messagesLoading]
  );

  useSubscribeObservable(messagesFetched$, handleFirstMessageFetch);
};
