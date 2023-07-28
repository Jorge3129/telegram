import { FC, UIEvent, useEffect, useMemo, useRef, useState } from "react";
import "./MessageList.scss";
import { useSelector } from "react-redux";
import { Chat } from "../../../chats/models/chat.model";
import { selectMessages } from "../../state/messages.reducer";
import MessageContainer from "../message-container/MessageContainer";
import LoadingSpinner from "../../../shared/components/loading-spinner/LoadingSpinner";
import { useScrollSubject } from "../../hooks/use-scroll-subject";
import { tap, filter, throttleTime } from "rxjs";
import { isNotNullable } from "../../../shared/utils/is-not-null";
import { MeasurableElement } from "../../utils/measurable-element";
import { useEmitFirstMessagesView } from "../../hooks/use-emit-first-messages-view";
import { useMessageReadsQueue } from "../../hooks/use-message-reads-queue";
import _ from "lodash";
import { getMessageText } from "../../utils/get-message-text";

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
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const containerRef = listRef.current;

    if (!containerRef || loading) {
      return;
    }

    const messagesMap = _.keyBy(messages, "id");

    const newObserver = new IntersectionObserver(
      (entries) => {
        const readMessages = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => {
            const messageId = entry.target.getAttribute("data-message-id");

            if (!messageId) {
              return null;
            }

            return messagesMap[messageId];
          })
          .filter(isNotNullable)
          .map((m) => getMessageText(m));

        console.log(readMessages);
      },
      {
        root: containerRef,
        threshold: [0.8],
      }
    );

    setObserver(newObserver);

    return () => newObserver.disconnect();
  }, [wrapperRef, loading, messages]);

  const { scroll$, emitScrollEvent } = useScrollSubject<MessageScrollEvent>();

  const mappedScroll$ = useMemo(() => {
    return scroll$.pipe(
      tap(),
      throttleTime(100, undefined, { trailing: true }),
      filter(isNotNullable)
    );
  }, [scroll$]);

  useEmitFirstMessagesView(wrapperRef, emitScrollEvent);

  const { emitMessageRead } = useMessageReadsQueue();

  if (loading) {
    return <LoadingSpinner backgroundColor="var(--light-blue-gray)" />;
  }

  return (
    <div ref={wrapperRef} className="message_list_scroll_wrapper">
      <div
        className={"message_list"}
        ref={listRef}
        onScroll={(e) =>
          emitScrollEvent({
            event: e,
            container: MeasurableElement.fromHtml(e.target as HTMLElement),
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
            observer={observer}
            emitMessageRead={emitMessageRead}
          />
        ))}
      </div>
    </div>
  );
};

export default MessageList;
