import { FC, UIEvent } from "react";
import "./MessageList.scss";
import { useSelector } from "react-redux";
import { Chat } from "../../../chats/models/chat.model";
import { useAutoScroll } from "../../hooks/useAutoScroll";
import { selectMessages } from "../../messages.reducer";
import MessageContainer from "../message-container/MessageContainer";
import LoadingSpinner from "../../../shared/components/loading-spinner/LoadingSpinner";
import { useScrollSubject } from "../../hooks/use-scroll-subject";

interface Props {
  currentChat: Chat;
}

export type MessageScrollEvent = UIEvent<HTMLDivElement>;

const MessageList: FC<Props> = ({ currentChat }) => {
  const { messages, loading } = useSelector(selectMessages);

  const scrollRef = useAutoScroll(currentChat?.unread || 0);

  const { scroll$, emitScrollEvent } = useScrollSubject<MessageScrollEvent>(0);

  if (loading) {
    return <LoadingSpinner backgroundColor="var(--light-blue-gray)" />;
  }

  return (
    <div className={"message_list"} ref={scrollRef} onScroll={emitScrollEvent}>
      {messages.map((message, i) => (
        <MessageContainer
          key={message.id}
          message={message}
          nextMessage={messages.at(i + 1)}
          currentChat={currentChat}
          scroll$={scroll$}
        />
      ))}
    </div>
  );
};

export default MessageList;
