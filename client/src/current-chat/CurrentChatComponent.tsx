import { FC } from "react";
import "./styles/CurrentChat.css";
import MainInputForm from "./MainInputForm";
import { Socket } from "socket.io-client";
import MediaModal from "./MediaModal";
import MainTopBar from "./MainTopBar";
import { Chat } from "../chats/models/chat.model";
import MessageListWrapper from "../messages/MessageListWrapper";

interface Props {
  socket: Socket | null;
  currentChat: Chat;
}

const CurrentChatComponent: FC<Props> = ({ socket, currentChat }) => {
  if (!socket)
    return (
      <div className="error_message">
        <h1>Socket Error!</h1>
      </div>
    );

  return (
    <div className="main_chat_container main_section">
      <MainTopBar />
      <MessageListWrapper socket={socket} currentChat={currentChat} />
      <MainInputForm socket={socket} />
      <MediaModal socket={socket} />
    </div>
  );
};

export default CurrentChatComponent;
