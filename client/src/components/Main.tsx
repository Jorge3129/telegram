import { FC, useEffect } from "react";
import { useSocket } from "../socket/socket";
import { useAppDispatch } from "../redux/store";
import { chatThunk } from "../chats/chats.reducer";
import { useSelector } from "react-redux";
import { selectCurrentChat } from "../current-chat/reducers/main.chat.reducer";
import MediaSidebar from "./media-sidebar/MediaSidebar";
import MainPlaceholder from "./MainPlaceholder";
import { User } from "../users/models/user.model";
import ChatsContainer from "../chats/components/ChatsContainer";
import CurrentChatComponent from "../current-chat/CurrentChatComponent";

interface MainProps {
  user: User;
}

const Main: FC<MainProps> = ({ user }) => {
  const { currentChat } = useSelector(selectCurrentChat);
  const [socket] = useSocket();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(chatThunk(user.id));
  }, []);

  return (
    <div className="main">
      <ChatsContainer />
      {currentChat ? (
        <div className="main_chat_media_container">
          <CurrentChatComponent socket={socket} currentChat={currentChat} />
          <MediaSidebar />
        </div>
      ) : (
        <MainPlaceholder />
      )}
    </div>
  );
};

export default Main;
