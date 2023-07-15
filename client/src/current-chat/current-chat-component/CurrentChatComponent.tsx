import { FC } from "react";
import "./CurrentChatComponent.scss";
import { Socket } from "socket.io-client";
import { Chat } from "../../chats/models/chat.model";
import MediaModal from "../../media/MediaModal";
import MessageListWrapper from "../../messages/components/message-list-wrapper/MessageListWrapper";
import CurrentChatTopBar from "../current-chat-top-bar/CurrentChatTopBar";
import CurrentChatInput from "../inputs/current-chat-input/CurrentChatInput";

interface Props {
  socket: Socket | null;
  currentChat: Chat;
}

const CurrentChatComponent: FC<Props> = ({ socket, currentChat }) => {
  if (!socket) {
    return (
      <div className="error_message">
        <h1>Socket Error!</h1>
      </div>
    );
  }

  return (
    <div className="main_chat_container main_section">
      <CurrentChatTopBar />
      <MessageListWrapper socket={socket} currentChat={currentChat} />
      <CurrentChatInput />
      <MediaModal />
    </div>
  );
};

export default CurrentChatComponent;
