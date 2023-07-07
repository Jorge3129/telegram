import dayjs from "dayjs";
import { FC } from "react";

interface Props {
  timestamp: string;
}

const MessageTimestamp: FC<Props> = ({ timestamp }) => {
  return (
    <span className="message_timestamp">
      {dayjs(timestamp).format("HH:mm")}
    </span>
  );
};

export default MessageTimestamp;
