import { FC, useEffect, useState } from "react";
import "./TextMessageComponent.scss";
import { useSelector } from "react-redux";
import MediaContainer from "../../../media/MediaContainer";
import { useLoadFile } from "../../../media/hooks/useLoadFile";
import { selectUser } from "../../../redux/user-reducer";
import MessageTimestamp from "../../../ui/message/MessageTimestamp";
import MessageStatusWrapper from "../../../ui/message/message-status/MessageStatusWrapper";
import { isOwnMessage } from "../../../utils/is-own-message";
import { Media } from "../../models/media.model";
import { TextMessage } from "../../models/message.model";
import { classIf } from "../../../utils/class-if";
import MessageContextMenu from "../message-context-menu/MessageContextMenu";

interface Props {
  message: TextMessage;
  callback: null | (() => void);
  chatType: "personal" | "group";
}

const TextMessageComponent: FC<Props> = ({ message, chatType, callback }) => {
  useEffect(() => {
    if (callback && !message.seen) {
      callback();
    }
  }, []);

  const [file, setFile] = useState<Media | null>(null);

  const { user } = useSelector(selectUser);

  useLoadFile(message.media.at(0), setFile);

  const isOwn = isOwnMessage(message, user);

  const showAuthor = chatType === "group" && !isOwn;

  return (
    <MessageContextMenu message={message}>
      <div className={"message_item" + classIf(isOwn, "own_message")}>
        <div className="message_author">{showAuthor && message.authorName}</div>
        {file && (
          <div className="message_media">
            <MediaContainer media={file} className="message_img" />
          </div>
        )}

        <div className="message_text">{message.text}</div>

        <div className="message_info">
          {message.edited && <div className="message_edited_label">edited</div>}
          <MessageTimestamp timestamp={message.timestamp} />
          <MessageStatusWrapper message={message} currentUser={user} />
        </div>

        <div className="clearfix"></div>
      </div>
    </MessageContextMenu>
  );
};

export default TextMessageComponent;