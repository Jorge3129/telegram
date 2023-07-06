import { FC, useEffect } from "react";
import MainChat from "./main-chat/MainChat";
import { useSocket } from "../socket/socket";
import { useAppDispatch } from "../redux/store";
import { chatThunk } from "../chats/chats.reducer";
import { useSelector } from "react-redux";
import { selectMainChat } from "./main-chat/reducers/main.chat.reducer";
import MediaSidebar from "./media-sidebar/MediaSidebar";
import MainPlaceholder from "./MainPlaceholder";
import { User } from "../users/models/user.model";
import ChatsContainer from "../chats/components/ChatsContainer";

interface MainProps {
  user: User;
}

const Main: FC<MainProps> = ({ user }) => {
  const { currentChatId } = useSelector(selectMainChat);
  const [socket] = useSocket();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(chatThunk(user.id));
  }, []);

  return (
    <div className="main">
      <ChatsContainer />
      {currentChatId ? (
        <div className="main_chat_media_container">
          <MainChat socket={socket} />
          <MediaSidebar />
        </div>
      ) : (
        <MainPlaceholder />
      )}
    </div>
  );
};

export default Main;
