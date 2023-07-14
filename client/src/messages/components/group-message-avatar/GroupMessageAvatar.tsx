import { FC } from "react";
import "./GroupMessageAvatar.scss";
import { useSelector } from "react-redux";
import { Chat } from "../../../chats/models/chat.model";
import { selectUser } from "../../../redux/user-reducer";
import { isOwnMessage } from "../../../utils/is-own-message";
import { Message } from "../../models/message.model";
import Avatar from "../../../components/reuse/Avatar";

interface Props {
  data: {
    currentChat: Chat;
    message: Message;
    nextMessage?: Message;
  };
}

const MessageAvatar: FC<Props> = ({ data }) => {
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
