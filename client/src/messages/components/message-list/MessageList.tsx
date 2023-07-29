import { FC, UIEvent, useRef } from "react";
import "./MessageList.scss";
import { useSelector } from "react-redux";
import { Chat } from "../../../chats/models/chat.model";
import { selectMessages } from "../../state/messages.reducer";
import MessageContainer from "../message-container/MessageContainer";
import LoadingSpinner from "../../../shared/components/loading-spinner/LoadingSpinner";
import { MeasurableElement } from "../../utils/measurable-element";
import { useObserveMessageReads } from "../../hooks/use-observe-message-reads";

interface Props {
  currentChat: Chat;
}

export type MessageScrollUIEvent = UIEvent<HTMLDivElement>;

export type MessageScrollEvent = {
  event: MessageScrollUIEvent | null;
  container: MeasurableElement;
};

const MessageList: FC<Props> = ({ currentChat }) => {
  const { messages, loading } = useSelector(selectMessages);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const { observer } = useObserveMessageReads(listRef, messages, loading);

  if (loading) {
    return <LoadingSpinner backgroundColor="var(--light-blue-gray)" />;
  }

  return (
    <div ref={wrapperRef} className="message_list_scroll_wrapper">
      <div className={"message_list"} ref={listRef}>
        {messages.map((message, i) => (
          <MessageContainer
            key={message.id}
            message={message}
            nextMessage={messages.at(i + 1)}
            currentChat={currentChat}
            observer={observer}
          />
        ))}
      </div>
    </div>
  );
};

export default MessageList;
