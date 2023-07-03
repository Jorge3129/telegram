import { FC } from "react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { formatTimestamp, getSeenIcon } from "./chats.utils";
import Avatar from "../reuse/Avatar";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/user-reducer";
import { Chat } from "../../chats/models/chat.model";
import { Message } from "../../chats/models/message.model";

dayjs.extend(isBetween);

interface IChatItem {
  chat: Chat;
}

const ChatItem: FC<IChatItem> = ({ chat }) => {
  const { lastMessage, title, unread, muted, type } = chat;

  const { user } = useSelector(selectUser);

  const formatChatAuthor = (
    message: Message | undefined,
    type: "personal" | "group"
  ): string => {
    if (!message || type === "personal") return "";

    const { author } = message;

    return author === user?.username ? "You: " : author + ": ";
  };

  const upperSection = (
    <ul className="chat_body_upper">
      <li className="chat_title_container hide_overflow">
        <div className="chat_title text_ellipsis">{title}</div>
      </li>
      <li className="chat_timestamp_container grey_text info_container">
        <div className="chat_timestamp">
          <span style={{ paddingRight: "0.3em" }}>
            {getSeenIcon(lastMessage, user)}
          </span>
          {formatTimestamp(lastMessage?.timestamp)}
        </div>
      </li>
    </ul>
  );

  const lowerSection = (
    <ul className="chat_body_lower">
      <div className="chat_last_message_container grey_text hide_overflow">
        <div className="chat_last_message text_ellipsis">
          <span className="chat_last_message_author">
            {formatChatAuthor(lastMessage, type)}
          </span>
          <span className="chat_last_message_text">{lastMessage?.text}</span>
        </div>
      </div>
      <div
        className="chat_unread_container info_container"
        style={unread ? {} : { display: "none" }}
      >
        <div className={"chat_unread" + (muted ? " muted" : "")}>{unread}</div>
      </div>
    </ul>
  );

  return (
    <ul className="chat_item">
      <Avatar chat={chat} title={title} prefix="chat" />
      <li className="chat_body">
        {upperSection}
        {lowerSection}
      </li>
    </ul>
  );
};

export default ChatItem;
