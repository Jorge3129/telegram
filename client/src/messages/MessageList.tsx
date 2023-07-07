import { FC } from "react";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import LoadSpinner from "../components/reuse/LoadSpinner";
import MessageAvatar from "./MessageAvatar";
import { selectUser } from "../redux/user-reducer";
import MessageComponent from "./MessageComponent";
import { useAutoScroll } from "./hooks/useAutoScroll";
import { selectMessages } from "./messages.reducer";
import { useDetectScroll } from "./hooks/useDetectScroll";
import "./styles/Messages.css";
import { Chat } from "../chats/models/chat.model";
import { isOwnMessage } from "../utils/is-own-message";

interface MessageListProps {
  socket: Socket;
  currentChat: Chat;
}

const MessageList: FC<MessageListProps> = ({ socket, currentChat }) => {
  const { messages, loading } = useSelector(selectMessages);

  const scrollRef = useAutoScroll(currentChat?.unread || 0);

  const { onMessagesFirstRendered, handleScroll } = useDetectScroll(
    socket,
    scrollRef,
    messages
  );

  const { user } = useSelector(selectUser);

  if (loading) {
    return <LoadSpinner backgroundColor="var(--light-blue-gray)" />;
  }

  return (
    <ul className={"message_list"} ref={scrollRef} onScroll={handleScroll}>
      {messages.map((message, i, { length }) => (
        <li
          className={
            "message_list_item" + (isOwnMessage(message, user) ? " self" : "")
          }
          key={message.id}
          id={"message-" + message.id}
        >
          <MessageAvatar
            data={{
              currentChat,
              message,
              nextMessage: messages[i + 1],
            }}
          />
          <MessageComponent
            message={message}
            callback={i === length - 1 ? onMessagesFirstRendered : null}
            chatType={currentChat.type}
          />
        </li>
      ))}
    </ul>
  );
};

export default MessageList;
