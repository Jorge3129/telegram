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

interface Props {
  message: Message;
  callback: null | (() => void);
  chatType: "personal" | "group";
}

const MessageComponent: FC<Props> = ({ message, chatType, callback }) => {
  if (isTextMessage(message)) {
    return (
      <TextMessageComponent
        message={message}
        callback={callback}
        chatType={chatType}
      />
    );
  }

  if (isGifMessage(message)) {
    return (
      <GifMessageComponent
        message={message}
        callback={callback}
        chatType={chatType}
      />
    );
  }

  if (isPollMessage(message)) {
    return (
      <PollMessageComponent
        message={message}
        callback={callback}
        chatType={chatType}
      />
    );
  }

  return <div>This message type is not supported yet</div>;
};

export default MessageComponent;
