import { FC } from "react";
import { formatChatMessageTimestamp } from "../../components/chat-sidebar/chats.utils";

interface Props {
  timestamp: string;
}

const LastMessageTimestamp: FC<Props> = ({ timestamp }) => {
  return <>{formatChatMessageTimestamp(timestamp)}</>;
};

export default LastMessageTimestamp;
