import { FC } from "react";
import "./styles/CurrentChat.css";
import "./styles/Messages.css";
import MainInputForm from "./MainInputForm";
import { Socket } from "socket.io-client";
import MediaModal from "./MediaModal";
import MainTopBar from "./MainTopBar";
import MessageList from "../messages/MessageList";

interface Props {
  socket: Socket | null;
}

const CurrentChatComponent: FC<Props> = ({ socket }) => {
  if (!socket)
    return (
      <div className="error_message">
        <h1>Socket Error!</h1>
      </div>
    );

  return (
    <div className="main_chat_container main_section">
      <MainTopBar />
      <MessageList socket={socket} />
      <MainInputForm socket={socket} />
      <MediaModal socket={socket} />
    </div>
  );
};

export default CurrentChatComponent;
