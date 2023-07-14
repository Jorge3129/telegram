import { FC, useEffect } from "react";
import "./MessageListWrapper.scss";
import { Socket } from "socket.io-client";
import { Chat } from "../../../chats/models/chat.model";
import DefaultWallPaper from "../../../components/reuse/DefaultWallPaper";
import { useAppDispatch } from "../../../redux/store";
import { messageThunk } from "../../messages.reducer";
import MessageList from "../message-list/MessageList";

interface Props {
  socket: Socket;
  currentChat: Chat;
}

const MessageListWrapper: FC<Props> = ({ socket, currentChat }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(messageThunk(currentChat.id));
  }, [currentChat.id]);

  return (
    <div className="message_list_wrapper">
      <DefaultWallPaper />
      <MessageList socket={socket} currentChat={currentChat} />
    </div>
  );
};

export default MessageListWrapper;
