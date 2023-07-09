import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { GifMessage } from "../models/message.model";
import { selectUser } from "../../redux/user-reducer";
import MessageTimestamp from "../../ui/message/MessageTimestamp";
import MessageStatusWrapper from "../../ui/message/message-status/MessageStatusWrapper";
import MessageContextMenu from "../MessageContextMenu";
import { isOwnMessage } from "../../utils/is-own-message";
import { Gif } from "@giphy/react-components";
import "./GifMessageComponent.css";

interface Props {
  message: GifMessage;
  callback: null | (() => void);
  chatType: "personal" | "group";
}

const GifMessageComponent: FC<Props> = ({ message, chatType, callback }) => {
  useEffect(() => {
    if (callback && !message.seen) {
      callback();
    }
  }, []);

  const { user } = useSelector(selectUser);

  const showAuthor = chatType === "group" && !isOwnMessage(message, user);

  return (
    <MessageContextMenu message={message}>
      <div className="message_item gif_message_item">
        <div className="message_author">{showAuthor && message.authorName}</div>
        <div className="message_media">
          <Gif gif={message.srcObject} width={220} hideAttribution noLink />
        </div>

        <div className="message_text">{message.text}</div>

        <div className="message_info">
          <MessageTimestamp timestamp={message.timestamp} />
          <MessageStatusWrapper message={message} currentUser={user} />
        </div>

        <div className="clearfix"></div>
      </div>
    </MessageContextMenu>
  );
};

export default GifMessageComponent;
