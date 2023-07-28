import { FC } from "react";
import "./ChatLastMessage.scss";
import { Message } from "../../../messages/models/message.model";
import LastMessageAuthor from "../../../ui/chats/LastMessageAuthor";
import { ChatType } from "../../models/chat.model";
import { getMessageText } from "../../../messages/utils/get-message-text";

interface Props {
  lastMessage: Message;
  chatType: ChatType;
}

const ChatLastMessage: FC<Props> = ({ lastMessage, chatType }) => {
  return (
    <div className="chat_last_message text_ellipsis">
      <span className="chat_last_message_author">
        <LastMessageAuthor message={lastMessage} chatType={chatType} />
      </span>

      <span className="chat_last_message_text">
        {getMessageText(lastMessage)}
      </span>
    </div>
  );
};

export default ChatLastMessage;
