import { FC } from "react";
import { formatChatMessageTimestamp } from "../../chats/utils/format-timestamp";

interface Props {
  timestamp: string;
}

const LastMessageTimestamp: FC<Props> = ({ timestamp }) => {
  return <>{formatChatMessageTimestamp(timestamp)}</>;
};

export default LastMessageTimestamp;
