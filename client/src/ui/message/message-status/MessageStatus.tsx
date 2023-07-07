import { FC } from "react";

interface MessageStatusProps {
  seen: boolean;
}

const MessageStatus: FC<MessageStatusProps> = ({ seen }) => {
  return seen ? (
    <i className="fa-solid fa-check-double chat_seen_icon" />
  ) : (
    <i className="fa-solid fa-check chat_seen_icon" />
  );
};

export default MessageStatus;
