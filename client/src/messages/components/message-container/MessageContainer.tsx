import { FC, useCallback, useRef } from "react";
import { Message } from "../../models/message.model";
import { isOwnMessage } from "../../../utils/is-own-message";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/user-reducer";
import { Chat } from "../../../chats/models/chat.model";
import { classIf } from "../../../utils/class-if";
import "./MessageContainer.scss";
import MessageAvatar from "../group-message-avatar/GroupMessageAvatar";
import MessageComponent from "../message-component/MessageComponent";
import { Observable } from "rxjs";
import { MessageScrollEvent } from "../message-list/MessageList";
import { useSubscribeObservable } from "../../hooks/use-observable";
import { getVisibleElementHeight } from "../../utils/get-visible-element-height";
import { useEmitMessageRead } from "../../hooks/use-emit-message-read";

interface Props {
  message: Message;
  nextMessage: Message | undefined;
  currentChat: Chat;
  scroll$: Observable<MessageScrollEvent | null>;
}

const MessageContainer: FC<Props> = ({
  message,
  nextMessage,
  currentChat,
  scroll$,
}) => {
  const { user } = useSelector(selectUser);
  const isSelf = isOwnMessage(message, user);

  const ref = useRef<HTMLDivElement>(null);

  const emitReadEvent = useEmitMessageRead();

  const handleScroll = useCallback(
    (e: MessageScrollEvent | null) => {
      if (!ref.current || !e?.target || message.isReadByCurrentUser) {
        return;
      }

      const totalHeight = ref.current.clientHeight;

      const visibleHeight = getVisibleElementHeight(
        ref.current,
        e.target as HTMLElement
      );

      if (visibleHeight < 0.8 * totalHeight) {
        return;
      }

      console.log(visibleHeight);
      emitReadEvent(message);
    },
    [message, emitReadEvent]
  );

  useSubscribeObservable(scroll$, handleScroll);

  return (
    <div
      ref={ref}
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
