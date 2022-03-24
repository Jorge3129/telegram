import {FC} from "react";
import {IChat, IMessage} from "../../types/types";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween"
import {formatLastMessage, formatTimestamp, getSeenIcon, initials} from "./chats.utils";

dayjs.extend(isBetween)

interface IChatItem {
    chat: IChat
}

const ChatItem: FC<IChatItem> = ({chat}) => {

    const {lastMessage, title, unread, muted} = chat;

    const avatar =
        <li className="chat_avatar_wrapper">
            <div className={"chat_avatar" + (chat.online ? ' online' : '')}>
                <div className="chat_avatar_text">
                    {initials(title)}
                </div>
            </div>
        </li>

    const upperSection =
        <ul className="chat_body_upper">
            <li className="chat_title_container hide_overflow">
                <div className="chat_title text_ellipsis">
                    {title}
                </div>
            </li>
            <li className="chat_timestamp_container grey_text info_container">
                <div className="chat_timestamp">
                    <span style={{paddingRight: '0.3em'}}>{
                        getSeenIcon(lastMessage)
                    }</span>
                    {formatTimestamp(lastMessage?.timestamp)}
                </div>
            </li>
        </ul>

    const lowerSection =
        <ul className="chat_body_lower">
            <div className="chat_last_message_container grey_text hide_overflow">
                <div className="chat_last_message text_ellipsis">
                    {formatLastMessage(lastMessage)}
                </div>
            </div>
            <div className="chat_unread_container info_container"
                 style={unread ? {} : {display: 'none'}}
            >
                <div className={"chat_unread" + (muted ? ' muted' : '')}>
                    {unread}
                </div>
            </div>
        </ul>

    return (
        <ul className="chat_item">
            {avatar}
            <li className="chat_body">
                {upperSection}
                {lowerSection}
            </li>
        </ul>
    );
};

export default ChatItem;
