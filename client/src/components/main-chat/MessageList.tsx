import Message from "./Message";
import React, { FC, useEffect } from "react";
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

interface IMessageList {
  socket: Socket;
}

const MessageList: FC<IMessageList> = ({ socket }) => {
  const { messages, loading } = useSelector(selectMessages);
  const { chatId, mainChat } = useSelector(selectMainChat);
  const scrollRef = useAutoScroll(mainChat?.unread || 0);
  const { onMessagesFirstRendered, handleScroll } = useDetectScroll(
    socket,
    scrollRef,
    messages
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(messageThunk(chatId || -1));
  }, [chatId]);

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
          {messages.map((msg, i, { length }) => (
            <li
              className={"message_list_item" + (isSelf(msg) ? " self" : "")}
              key={msg.id}
              id={"message-" + msg.id}
            >
              <MessageAvatar
                data={{ mainChat, msg, nextMsg: messages[i + 1] }}
              />
              <Message
                msg={msg}
                callback={i === length - 1 ? onMessagesFirstRendered : null}
                type={mainChat?.type || "personal"}
              />
              {false && msg.id}
              {false && msg.author.split("")[0]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MessageList;
