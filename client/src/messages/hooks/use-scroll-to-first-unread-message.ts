import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectMessages } from "../messages.reducer";
import { selectCurrentChat } from "../../current-chat/reducers/current-chat.reducer";

// TODO refactor this logic
export const useScrollToFirstUnreadMessage = () => {
  const { messages, loading } = useSelector(selectMessages);
  const { currentChat } = useSelector(selectCurrentChat);

  useEffect(() => {
    messages;
    loading;
    currentChat;
  }, []);

  useEffect(() => {
    if (!currentChat || loading || messages.length < currentChat.unread) {
      return;
    }

    const lastMessageIndex = messages.length - currentChat.unread - 1;

    const messageId = messages[lastMessageIndex]?.id;

    const lastMessage = document.getElementById(`message-${messageId || ""}`);

    if (!lastMessage) {
      return;
    }

    lastMessage.scrollIntoView();
  }, [loading]);
};
