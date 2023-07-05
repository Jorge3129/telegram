import { FC } from "react";
import MessageStatus from "./MessageStatus";
import { Message } from "../../../messages/message.model";
import { User } from "../../../users/models/user.model";

interface Props {
  message: Message | undefined;
  currentUser: User | null;
}

const MessageStatusWrapper: FC<Props> = ({ message: msg, currentUser }) => {
  if (!msg || msg.author !== currentUser?.username) {
    return null;
  }

  return <MessageStatus seen={!!msg.seen} />;
};

export default MessageStatusWrapper;
