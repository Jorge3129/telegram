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
import { useEmitMessageRead } from "../../hooks/use-emit-message-read";
import { isMessageVisible } from "../../utils/is-message-visible";
import { useScrollToFirstUnreadMessage } from "../../hooks/use-scroll-to-first-unread-message";

interface Props {
  message: Message;
  nextMessage: Message | undefined;
  currentChat: Chat;
  scroll$: Observable<MessageScrollEvent>;
}

const MessageContainer: FC<Props> = ({
  message,
  nextMessage,
  currentChat,
  scroll$,
}) => {
  const { user } = useSelector(selectUser);
  const isSelf = isOwnMessage(message, user);

  const messageRef = useRef<HTMLDivElement>(null);

  useScrollToFirstUnreadMessage(currentChat, message, messageRef);

  const emitReadEvent = useEmitMessageRead();

  const scrollForUnread$ = useMemo(() => {
    return scroll$.pipe(
      filter(() => !message.isReadByCurrentUser),
      filter(
        (e) =>
          !!messageRef.current &&
          isMessageVisible(messageRef.current, e.container)
      ),
      tap()
    );
  }, [scroll$, message]);

  const handleScroll = useCallback(() => {
    emitReadEvent(message);
  }, [message, emitReadEvent]);

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
