import { FC, useEffect } from "react";
import "./MainComponent.scss";
import { useSelector } from "react-redux";
import { chatThunk } from "../../chats/chats.reducer";
import CurrentChatComponent from "../../current-chat/current-chat-component/CurrentChatComponent";
import { selectCurrentChat } from "../../current-chat/reducers/current-chat.reducer";
import ReactionMediaPane from "../../reaction-media/reaction-media-pane/ReactionMediaPane";
import { useAppDispatch } from "../../redux/store";
import { User } from "../../users/models/user.model";
import MainPlaceholder from "../main-placeholder/MainPlaceholder";
import ChatsContainer from "../../chats/components/chats-container/ChatsContainer";
import { SocketProvider } from "../../socket/SocketProvider";

interface Props {
  user: User;
}

const MainComponent: FC<Props> = ({ user }) => {
  const { currentChat } = useSelector(selectCurrentChat);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(chatThunk(user.id));
  }, []);

  return (
    <SocketProvider>
      <div className="main">
        <ChatsContainer />
        {currentChat ? (
          <div className="main_chat_media_container">
            <CurrentChatComponent currentChat={currentChat} />
            <ReactionMediaPane />
          </div>
        ) : (
          <MainPlaceholder />
        )}
      </div>
    </SocketProvider>
  );
};

export default MainComponent;
