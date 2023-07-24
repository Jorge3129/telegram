import { FC, UIEvent, useEffect, useMemo } from "react";
import "./MessageList.scss";
import { useSelector } from "react-redux";
import { Chat } from "../../../chats/models/chat.model";
import { useAutoScroll } from "../../hooks/useAutoScroll";
import { selectMessages } from "../../messages.reducer";
import MessageContainer from "../message-container/MessageContainer";
import LoadingSpinner from "../../../shared/components/loading-spinner/LoadingSpinner";
import { useScrollSubject } from "../../hooks/use-scroll-subject";
import { tap, filter } from "rxjs";
import { isNotNullable } from "../../../shared/utils/is-not-null";

interface Props {
  currentChat: Chat;
}

export type MessageScrollUIEvent = UIEvent<HTMLDivElement>;

export type MessageScrollEvent = {
  event: MessageScrollUIEvent | null;
  container: HTMLElement;
};

const MessageList: FC<Props> = ({ currentChat }) => {
  const { messages, loading } = useSelector(selectMessages);

  const scrollRef = useAutoScroll(currentChat?.unread || 0);

  const { scroll$, emitScrollEvent } = useScrollSubject<MessageScrollEvent>(0);

  useEffect(() => {
    if (scrollRef.current) {
      emitScrollEvent({
        event: null,
        container: scrollRef.current,
      });
    }
  }, [scrollRef, emitScrollEvent]);

  const mappedScroll$ = useMemo(() => {
    return scroll$.pipe(tap(), filter(isNotNullable));
  }, [scroll$]);

  if (loading) {
    return <LoadingSpinner backgroundColor="var(--light-blue-gray)" />;
  }

  return (
    <div
      className={"message_list"}
      ref={scrollRef}
      onScroll={(e) =>
        emitScrollEvent({
          event: e,
          container: e.target as HTMLElement,
        })
      }
    >
      {messages.map((message, i) => (
        <MessageContainer
          key={message.id}
          message={message}
          nextMessage={messages.at(i + 1)}
          currentChat={currentChat}
          scroll$={mappedScroll$}
        />
      ))}
    </div>
  );
};

export default MessageList;
