import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectMessages } from "../messages.reducer";
import { selectUser } from "../../redux/user-reducer";
import { isOwnMessage } from "../../utils/is-own-message";

export const useAutoScroll = (unread: number) => {
  const { messages, loading } = useSelector(selectMessages);
  const [messageLength, setMessageLength] = useState(messages?.length || 0);

  const scrollRef = useRef<HTMLUListElement>(null);

  const { user } = useSelector(selectUser);

  useEffect(() => {
    if (messages.length === messageLength) return;
    setMessageLength(messages.length);
  }, [messages]);

  // jump to the last message the user has seen
  useEffect(() => {
    const messageId = messages[messages.length - unread - 1]?.id;
    const last = document.getElementById("message-" + messageId);

    if (!last) {
      return;
    }

    //last.setAttribute('style', 'background-color: #ffa099')
    last.scrollIntoView();
  }, [loading]);

  // jump to bottom when new message is added
  useEffect(() => {
    const list = scrollRef.current;

    if (list && messages && isOwnMessage(messages.slice(-1)[0], user)) {
      list.scrollTop = list.scrollHeight;
    }
  }, [messageLength]);

  return scrollRef;
};
