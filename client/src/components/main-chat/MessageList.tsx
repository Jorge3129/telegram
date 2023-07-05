import MessageComponent from "./MessageComponent";
import { FC, useEffect } from "react";
import { isSelf } from "../../utils/general.utils";
import { useSelector } from "react-redux";
import { messageThunk, selectMessages } from "./reducers/messages.reducer";
import { selectMainChat } from "./reducers/main.chat.reducer";
import { useAutoScroll } from "./hooks/useAutoScroll";
import { useDetectScroll } from "./hooks/useDetectScroll";
import { Socket } from "socket.io-client";
import { useAppDispatch } from "../../redux/store";
import MessageAvatar from "../reuse/MessageAvatar";
import LoadSpinner from "../reuse/LoadSpinner";
import wallpaper from "../../assets/telegram_background.png";
import { selectUser } from "../../redux/user-reducer";

interface IMessageList {
  socket: Socket;
}

const MessageList: FC<IMessageList> = ({ socket }) => {
  const { messages, loading } = useSelector(selectMessages);
  const { currentChatId, mainChat } = useSelector(selectMainChat);
  const scrollRef = useAutoScroll(mainChat?.unread || 0);
  const { onMessagesFirstRendered, handleScroll } = useDetectScroll(
    socket,
    scrollRef,
    messages
  );
  const dispatch = useAppDispatch();

  const { user } = useSelector(selectUser);

  useEffect(() => {
    dispatch(messageThunk(currentChatId || -1));
  }, [currentChatId]);

  return (
    <div className="message_list_wrapper">
      <img src={wallpaper} alt="wallpaper" className="chat_wallpaper" />
      {loading ? (
        <LoadSpinner backgroundColor="var(--light-blue-gray)" />
      ) : (
        <ul
          className={"message_list" + (loading ? " msg-loading" : "")}
          ref={scrollRef}
          onScroll={handleScroll}
        >
          {messages.map((message, i, { length }) => (
            <li
              className={
                "message_list_item" + (isSelf(message, user) ? " self" : "")
              }
              key={message.id}
              id={"message-" + message.id}
            >
              <MessageAvatar
                data={{ mainChat, msg: message, nextMsg: messages[i + 1] }}
              />
              <MessageComponent
                message={message}
                callback={i === length - 1 ? onMessagesFirstRendered : null}
                chatType={mainChat?.type || "personal"}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MessageList;
