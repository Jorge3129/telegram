import { FC, useEffect } from "react";
import { Socket } from "socket.io-client";
import { useAppDispatch } from "../redux/store";

import { messageThunk } from "./messages.reducer";
import { Chat } from "../chats/models/chat.model";
import MessageList from "./MessageList";
import "./styles/Messages.css";
import DefaultWallPaper from "../components/reuse/DefaultWallPaper";

interface MessageListWrapperProps {
  socket: Socket;
  currentChat: Chat;
}

const MessageListWrapper: FC<MessageListWrapperProps> = ({
  socket,
  currentChat,
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(messageThunk(currentChat.id));
  }, [currentChat.id]);

  return (
    <div className="message_list_wrapper">
      <DefaultWallPaper />
      <MessageList socket={socket} currentChat={currentChat} />
    </div>
  );
};

export default MessageListWrapper;
