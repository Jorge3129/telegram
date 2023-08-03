import { FC } from "react";
import "./GifMessageComponent.scss";
import { Gif } from "@giphy/react-components";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/user-reducer";
import MessageTimestamp from "../../../ui/message/MessageTimestamp";
import MessageStatusWrapper from "../../../ui/message/message-status/MessageStatusWrapper";
import { isOwnMessage } from "../../../utils/is-own-message";
import { GifMessage } from "../../models/message.model";
import { classIf } from "../../../utils/class-if";
import GifMessageContextMenu from "./gif-message-context-menu/GifMessageContextMenu";
import { ChatType } from "../../../chats/models/chat.model";

interface Props {
  message: GifMessage;
  chatType: ChatType;
}

const GifMessageComponent: FC<Props> = ({ message, chatType }) => {
  const { user } = useSelector(selectUser);

  const isOwn = isOwnMessage(message, user);

  const showAuthor = chatType === "group" && !isOwn;

  return (
    <GifMessageContextMenu
      message={message}
      renderChildren={(props) => (
        <div
          {...props}
          className={
            "message_item gif_message_item" + classIf(isOwn, "own_message")
          }
        >
          <div className="message_author">
            {showAuthor && message.authorName}
          </div>
          <div className="message_media">
            <Gif gif={message.srcObject} width={220} hideAttribution noLink />
          </div>

          <div className="message_info">
            <MessageTimestamp timestamp={message.timestamp} />
            <MessageStatusWrapper message={message} currentUser={user} />
          </div>

          <div className="clearfix"></div>
        </div>
      )}
    />
  );
};

export default GifMessageComponent;
