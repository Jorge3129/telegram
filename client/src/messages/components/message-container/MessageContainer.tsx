import { FC, useCallback, useMemo, useRef } from "react";
import { Message } from "../../models/message.model";
import { isOwnMessage } from "../../../utils/is-own-message";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/user-reducer";
import { Chat } from "../../../chats/models/chat.model";
import { classIf } from "../../../utils/class-if";
import "./MessageContainer.scss";
import MessageAvatar from "../group-message-avatar/GroupMessageAvatar";
import MessageComponent from "../message-component/MessageComponent";
import { Observable, filter, tap } from "rxjs";
import { MessageScrollEvent } from "../message-list/MessageList";
import { useSubscribeObservable } from "../../../shared/hooks/use-subscribe-observable";
import { isMessageVisible } from "../../utils/is-message-visible";
import { useScrollToFirstUnreadMessage } from "../../hooks/use-scroll-to-first-unread-message";
import { useEmitLocalMessageRead } from "../../hooks/use-emit-local-message-read";

interface Props {
  message: Message;
  nextMessage: Message | undefined;
  currentChat: Chat;
  scroll$: Observable<MessageScrollEvent>;
  emitMessageRead: (message: Message) => void;
}

const MessageContainer: FC<Props> = ({
  message,
  nextMessage,
  currentChat,
  scroll$,
  emitMessageRead,
}) => {
  const { user } = useSelector(selectUser);
  const isSelf = isOwnMessage(message, user);

  const messageRef = useRef<HTMLDivElement>(null);

  useScrollToFirstUnreadMessage(currentChat, message, messageRef);

  const emitLocalReadEvent = useEmitLocalMessageRead();

  const scrollForUnread$ = useMemo(() => {
    return scroll$.pipe(
      filter(
        () => !message.isReadByCurrentUser && !message.isCurrentUserAuthor
      ),
      filter(
        (event) =>
          !!messageRef.current &&
          isMessageVisible(messageRef.current, event.container)
      ),
      tap()
    );
  }, [scroll$, message]);

  const handleScroll = useCallback(() => {
    emitMessageRead(message);
    emitLocalReadEvent(message);
  }, [message, emitLocalReadEvent]);

  useSubscribeObservable(scrollForUnread$, handleScroll);

  return (
    <div
      ref={messageRef}
      className={"message_container" + classIf(isSelf, "own_message_container")}
      id={"message-" + message.id}
    >
      <MessageAvatar
        data={{
          currentChat,
          message,
          nextMessage,
        }}
      />

      <MessageComponent message={message} chatType={currentChat.type} />
    </div>
  );
};

export default MessageContainer;
