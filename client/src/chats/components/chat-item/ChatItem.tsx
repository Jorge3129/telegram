import { FC } from "react";
import "./ChatItem.scss";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/user-reducer";
import LastMessageTimestamp from "../../../ui/chats/LastMessageTimestamp";
import MessageStatusWrapper from "../../../ui/message/message-status/MessageStatusWrapper";
import { Chat } from "../../models/chat.model";
import ChatAvatar from "../chat-avatar/ChatAvatar";
import { classIf } from "../../../utils/class-if";
import ChatLastMessage from "../chat-last-message/ChatLastMessage";

dayjs.extend(isBetween);

interface Props {
  chat: Chat;
  selected: boolean;
}

const ChatItem: FC<Props> = ({ chat }) => {
  const { lastMessage, title, unread, muted, type } = chat;

  const { user } = useSelector(selectUser);

  const upperSection = (
    <div className="chat_body_upper">
      <div className="chat_title_container hide_overflow">
        <div className="chat_title text_ellipsis">{title}</div>
      </div>

      <div className="chat_timestamp_container grey_text info_container">
        <div className="chat_timestamp">
          <span style={{ paddingRight: "0.3em" }}>
            <MessageStatusWrapper message={lastMessage} currentUser={user} />
          </span>
          {!!lastMessage && (
            <LastMessageTimestamp timestamp={lastMessage.timestamp} />
          )}
        </div>
      </div>
    </div>
  );

  const lowerSection = (
    <div className="chat_body_lower">
      <div className="chat_last_message_container grey_text hide_overflow">
        {!!lastMessage && (
          <ChatLastMessage lastMessage={lastMessage} chatType={type} />
        )}
      </div>

      <div
        className="chat_unread_container info_container"
        style={unread ? {} : { display: "none" }}
      >
        <div className={"chat_unread" + classIf(muted, "muted")}>{unread}</div>
      </div>
    </div>
  );

  return (
    <div className="chat_item">
      <ChatAvatar chat={chat} title={title} />

      <div className="chat_body">
        {upperSection}
        {lowerSection}
      </div>
    </div>
  );
};

export default ChatItem;
