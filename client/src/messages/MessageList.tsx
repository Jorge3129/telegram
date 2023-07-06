import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import LoadSpinner from "../components/reuse/LoadSpinner";
import MessageAvatar from "../components/reuse/MessageAvatar";
import { useAppDispatch } from "../redux/store";
import { selectUser } from "../redux/user-reducer";
import { isSelf } from "../utils/general.utils";
import MessageComponent from "./MessageComponent";
import wallpaper from "../assets/telegram_background.png";
import { useAutoScroll } from "./hooks/useAutoScroll";
import { selectCurrentChat } from "../current-chat/reducers/main.chat.reducer";
import { selectMessages, messageThunk } from "./messages.reducer";
import { useDetectScroll } from "./hooks/useDetectScroll";

interface IMessageList {
  socket: Socket;
}

const MessageList: FC<IMessageList> = ({ socket }) => {
  const { messages, loading } = useSelector(selectMessages);
  const { currentChatId, currentChat } = useSelector(selectCurrentChat);

  const scrollRef = useAutoScroll(currentChat?.unread || 0);

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
                data={{
                  currentChat: currentChat,
                  msg: message,
                  nextMsg: messages[i + 1],
                }}
              />
              <MessageComponent
                message={message}
                callback={i === length - 1 ? onMessagesFirstRendered : null}
                chatType={currentChat?.type || "personal"}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MessageList;
