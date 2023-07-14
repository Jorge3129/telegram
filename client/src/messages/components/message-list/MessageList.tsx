import { FC } from "react";
import "./MessageList.scss";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { Chat } from "../../../chats/models/chat.model";
import LoadSpinner from "../../../components/reuse/LoadSpinner";
import { useAutoScroll } from "../../hooks/useAutoScroll";
import { useDetectScroll } from "../../hooks/useDetectScroll";
import { selectMessages } from "../../messages.reducer";
import MessageContainer from "../message-container/MessageContainer";

interface Props {
  socket: Socket;
  currentChat: Chat;
}

const MessageList: FC<Props> = ({ socket, currentChat }) => {
  const { messages, loading } = useSelector(selectMessages);

  const scrollRef = useAutoScroll(currentChat?.unread || 0);

  const { onMessagesFirstRendered, handleScroll } = useDetectScroll(
    socket,
    scrollRef,
    messages
  );

  if (loading) {
    return <LoadSpinner backgroundColor="var(--light-blue-gray)" />;
  }

  return (
    <div className={"message_list"} ref={scrollRef} onScroll={handleScroll}>
      {messages.map((message, i, { length }) => (
        <MessageContainer
          key={message.id}
          isLast={i === length - 1}
          message={message}
          nextMessage={messages.at(i + 1)}
          currentChat={currentChat}
          onMessagesFirstRendered={onMessagesFirstRendered}
        />
      ))}
    </div>
  );
};

export default MessageList;
