import { FC } from "react";
import "./MessageComponent.scss";
import {
  Message,
  isTextMessage,
  isGifMessage,
  isPollMessage,
} from "../../models/message.model";
import GifMessageComponent from "../gif-message-component/GifMessageComponent";
import TextMessageComponent from "../text-message-component/TextMessageComponent";
import PollMessageComponent from "../poll-message-component/PollMessageComponent";
import { ChatType } from "../../../chats/models/chat.model";

interface Props {
  message: Message;
  chatType: ChatType;
}

const MessageComponent: FC<Props> = ({ message, chatType }) => {
  if (isTextMessage(message)) {
    return <TextMessageComponent message={message} chatType={chatType} />;
  }

  if (isGifMessage(message)) {
    return <GifMessageComponent message={message} chatType={chatType} />;
  }

  if (isPollMessage(message)) {
    return <PollMessageComponent message={message} chatType={chatType} />;
  }

  return <div>This message type is not supported yet</div>;
};

export default MessageComponent;
