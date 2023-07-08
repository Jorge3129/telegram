import { FC } from "react";
import { Message, isTextMessage } from "./models/message.model";
import "./styles/MessageComponent.css";
import TextMessageComponent from "./TextMessageComponent";

interface IPropsMessage {
  message: Message;
  callback: null | (() => void);
  chatType: "personal" | "group";
}

const MessageComponent: FC<IPropsMessage> = ({
  message,
  chatType,
  callback,
}) => {
  if (isTextMessage(message)) {
    return (
      <TextMessageComponent
        message={message}
        callback={callback}
        chatType={chatType}
      />
    );
  }

  return <div>This message type is not supported yet</div>;
};

export default MessageComponent;
