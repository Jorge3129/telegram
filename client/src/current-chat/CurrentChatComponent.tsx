import { FC } from "react";
import { Socket } from "socket.io-client";
import MediaModal from "../media/MediaModal";
import MainTopBar from "./MainTopBar";
import { Chat } from "../chats/models/chat.model";
import "./styles/CurrentChat.css";
import ChatInput from "./inputs/ChatInput";
import MessageListWrapper from "../messages/components/message-list-wrapper/MessageListWrapper";

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
      <ChatInput />
      <MediaModal />
    </div>
  );
};

export default CurrentChatComponent;
