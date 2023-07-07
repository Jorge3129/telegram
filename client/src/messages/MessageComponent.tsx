import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Message, Media } from "./models/message.model";
import { selectUser } from "../redux/user-reducer";
import MessageTimestamp from "../ui/message/MessageTimestamp";
import MessageStatusWrapper from "../ui/message/message-status/MessageStatusWrapper";
import { useLoadFile } from "../media/hooks/useLoadFile";
import MediaContainer from "../media/MediaContainer";

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
          <MediaContainer media={file} className="message_img" />
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