import { FC } from "react";
import "./ChatLastMessage.scss";
import {
  Message,
  isGifMessage,
  isPollMessage,
} from "../../../messages/models/message.model";
import LastMessageAuthor from "../../../ui/chats/LastMessageAuthor";

interface Props {
  lastMessage: Message;
  chatType: "personal" | "group"; // TODO refactor chat type enum
}

const getLastMessageText = (message: Message): string => {
  if (isPollMessage(message)) {
    return `*Poll* ${message.poll.question}`;
  }

  if (isGifMessage(message)) {
    return `*Gif*`;
  }

  const bits = [message.text];

  if (message.media.length) {
    bits.unshift(`*Media*`);
  }

  return bits.join(" ");
};

const ChatLastMessage: FC<Props> = ({ lastMessage, chatType }) => {
  return (
    <div className="chat_last_message text_ellipsis">
      <span className="chat_last_message_author">
        <LastMessageAuthor message={lastMessage} chatType={chatType} />
      </span>

      <span className="chat_last_message_text">
        {getLastMessageText(lastMessage)}
      </span>
    </div>
  );
};

export default ChatLastMessage;
