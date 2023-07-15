import { FC, useEffect } from "react";
import "./MainComponent.scss";
import { useSelector } from "react-redux";
import { chatThunk } from "../../chats/chats.reducer";
import ChatsContainer from "../../chats/components/ChatsContainer";
import CurrentChatComponent from "../../current-chat/current-chat-component/CurrentChatComponent";
import { selectCurrentChat } from "../../current-chat/reducers/current-chat.reducer";
import ReactionMediaPane from "../../reaction-media/reaction-media-pane/ReactionMediaPane";
import { useAppDispatch } from "../../redux/store";
import { useSocket } from "../../socket/socket";
import { User } from "../../users/models/user.model";
import MainPlaceholder from "../main-placeholder/MainPlaceholder";

interface Props {
  user: User;
}

const MainComponent: FC<Props> = ({ user }) => {
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

export default MainComponent;
