import { FC, useEffect, useState } from "react";
import { getMediaByType } from "../../utils/general.utils";
import { useLoadFile } from "./hooks/useLoadFile";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/user-reducer";
import { Media, Message } from "../../messages/message.model";
import MessageTimestamp from "../../ui/message/MessageTimestamp";
import MessageStatusWrapper from "../../ui/message/message-status/MessageStatusWrapper";

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
  useEffect(() => {
    if (callback && !message.seen) {
      callback();
    }
  }, []);

  const [file, setFile] = useState<Media | null>(null);

  const { user } = useSelector(selectUser);

  useLoadFile(message.media, setFile);

  const showAuthor = chatType === "group" && message.author !== user?.username;

  return (
    <div className="message_item">
      <div className="message_author">{showAuthor && message.author}</div>
      {file && (
        <div className="message_media">
          {getMediaByType(file, "message_img")}
        </div>
      )}

      <div className="message_text">{message.text}</div>

      <div className="message_info">
        <MessageStatusWrapper message={message} currentUser={user} />
        <MessageTimestamp timestamp={message.timestamp} />
      </div>

      <div className="clearfix"></div>
    </div>
  );
};

export default MessageComponent;
