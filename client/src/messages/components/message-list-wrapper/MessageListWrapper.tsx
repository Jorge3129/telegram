import { FC, useEffect } from "react";
import "./MessageListWrapper.scss";
import { Chat } from "../../../chats/models/chat.model";
import { useAppDispatch } from "../../../redux/store";
import { messageThunk } from "../../messages.reducer";
import MessageList from "../message-list/MessageList";
import DefaultWallPaper from "../../../shared/components/default-wallpaper/DefaultWallpaper";

interface Props {
  currentChat: Chat;
}

const MessageListWrapper: FC<Props> = ({ currentChat }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(messageThunk(currentChat.id));
  }, [currentChat.id, dispatch]);

  return (
    <div className="message_list_wrapper">
      <DefaultWallPaper />
      <MessageList currentChat={currentChat} />
    </div>
  );
};

export default MessageListWrapper;
