import { FC, UIEvent, useMemo } from "react";
import "./MessageList.scss";
import { useSelector } from "react-redux";
import { Chat } from "../../../chats/models/chat.model";
import { useAutoScroll } from "../../hooks/useAutoScroll";
import { selectMessages } from "../../messages.reducer";
import MessageContainer from "../message-container/MessageContainer";
import LoadingSpinner from "../../../shared/components/loading-spinner/LoadingSpinner";
import { BehaviorSubject, debounceTime } from "rxjs";

interface Props {
  currentChat: Chat;
}

const MessageList: FC<Props> = ({ currentChat }) => {
  const { messages, loading } = useSelector(selectMessages);

  const scrollRef = useAutoScroll(currentChat?.unread || 0);

  const scrollSubject$ = useMemo(() => {
    return new BehaviorSubject<UIEvent<HTMLDivElement> | null>(null);
  }, []);

  const scroll$ = useMemo(() => {
    return scrollSubject$.pipe(debounceTime(300));
  }, [scrollSubject$]);

  if (loading) {
    return <LoadingSpinner backgroundColor="var(--light-blue-gray)" />;
  }

  return (
    <div
      className={"message_list"}
      ref={scrollRef}
      onScroll={(e) => scrollSubject$.next(e)}
    >
      {messages.map((message, i) => (
        <MessageContainer
          key={message.id}
          message={message}
          nextMessage={messages.at(i + 1)}
          currentChat={currentChat}
        />
      ))}
    </div>
  );
};

export default MessageList;
