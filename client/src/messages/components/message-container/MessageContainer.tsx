import { FC, useEffect, useRef } from "react";
import { Message } from "../../models/message.model";
import { isOwnMessage } from "../../../utils/is-own-message";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/user-reducer";
import { Chat } from "../../../chats/models/chat.model";
import { classIf } from "../../../utils/class-if";
import "./MessageContainer.scss";
import MessageAvatar from "../group-message-avatar/GroupMessageAvatar";
import MessageComponent from "../message-component/MessageComponent";
import { useScrollToFirstUnreadMessage } from "../../hooks/use-scroll-to-first-unread-message";

interface Props {
  message: Message;
  nextMessage: Message | undefined;
  currentChat: Chat;
  observer: IntersectionObserver | null;
}

const MessageContainer: FC<Props> = ({
  message,
  nextMessage,
  currentChat,
  observer,
}) => {
  const { user } = useSelector(selectUser);
  const isSelf = isOwnMessage(message, user);

  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const messageElement = messageRef.current;

    if (!observer || !messageElement) {
      return;
    }

    if (message.isReadByCurrentUser || message.isCurrentUserAuthor) {
      return;
    }

    observer.observe(messageRef.current);

    return () => observer.unobserve(messageElement);
  }, [observer, message.isReadByCurrentUser, message.isCurrentUserAuthor]);

  useScrollToFirstUnreadMessage(currentChat, message, messageRef);

  return (
    <div
      ref={messageRef}
      className={"message_container" + classIf(isSelf, "own_message_container")}
      data-message-id={message.id}
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
