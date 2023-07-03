import { FC, useEffect, useState } from "react";
import { Media } from "../../types/types";
import dayjs from "dayjs";
import { useContextMenu } from "./hooks/useContextMenu";
import { getSeenIcon } from "../chat-sidebar/chats.utils";
import ContextMenu from "./ContextMenu";
import { getMediaByType } from "../../utils/general.utils";
import { useLoadFile } from "./hooks/useLoadFile";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/user-reducer";
import { Message } from "../../chats/models/message.model";

interface IPropsMessage {
  msg: Message;
  callback: null | (() => void);
  type: "personal" | "group";
}

const MessageComponent: FC<IPropsMessage> = ({ msg, callback, type }) => {
  const { text, timestamp, author, media } = msg;

  useEffect(() => {
    if (callback && !msg.seen) callback();
  }, []);

  const [file, setFile] = useState<Media | null>(null);

  const { user } = useSelector(selectUser);

  useLoadFile(media, setFile);

  const { contextMenu, handleContextMenu } = useContextMenu(msg);

  const showAuthor = type === "group" && author !== user?.username;

  return (
    <ul className="message_item" onContextMenu={handleContextMenu}>
      <li className="message_author">{showAuthor && author}</li>
      {file && (
        <li className="message_media">{getMediaByType(file, "message_img")}</li>
      )}
      <li className="message_text">{text}</li>
      <li className="message_info">
        {getSeenIcon(msg, user)}
        <span className="message_timestamp">
          {dayjs(timestamp).format("HH:mm")}
        </span>
      </li>
      <div className="clearfix"></div>
      <ContextMenu msg={msg} type={type} contextMenu={contextMenu} />
    </ul>
  );
};

export default MessageComponent;
