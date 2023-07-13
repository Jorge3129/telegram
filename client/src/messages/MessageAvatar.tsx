import { FC } from "react";
import Avatar from "../components/reuse/Avatar";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/user-reducer";
import { Chat } from "../chats/models/chat.model";
import { Message } from "./models/message.model";
import { isOwnMessage } from "../utils/is-own-message";

interface IMessageAvatar {
  data: {
    currentChat: Chat;
    message: Message;
    nextMessage: Message;
  };
}

const MessageAvatar: FC<IMessageAvatar> = ({ data }) => {
  const { currentChat, message, nextMessage } = data;

  const { user } = useSelector(selectUser);

  if (currentChat.type !== "group" || isOwnMessage(message, user)) {
    return null;
  }

  return (
    <Avatar
      prefix="message"
      title={message.authorName}
      hide={nextMessage && nextMessage.authorId === message.authorId}
    />
  );
};

export default MessageAvatar;
