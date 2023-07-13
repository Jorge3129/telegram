import { FC, useEffect } from "react";
import { useSocket } from "../socket/socket";
import { useAppDispatch } from "../redux/store";
import { chatThunk } from "../chats/chats.reducer";
import { useSelector } from "react-redux";
import { selectCurrentChat } from "../current-chat/reducers/current-chat.reducer";
import MainPlaceholder from "./MainPlaceholder";
import { User } from "../users/models/user.model";
import ChatsContainer from "../chats/components/ChatsContainer";
import CurrentChatComponent from "../current-chat/CurrentChatComponent";
import ReactionMediaPane from "../reaction-media/ReactionMediaPane";

interface MainProps {
  user: User;
}

const Main: FC<MainProps> = ({ user }) => {
  const { currentChat } = useSelector(selectCurrentChat);
  const [socket] = useSocket();
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(chatThunk(user.id));
  }, []);

  return (
    <div className="main">
      <ChatsContainer />
      {currentChat ? (
        <div className="main_chat_media_container">
          <CurrentChatComponent socket={socket} currentChat={currentChat} />
          <ReactionMediaPane />
        </div>
      ) : (
        <MainPlaceholder />
      )}
    </div>
  );
};

export default Main;
