import { FC } from "react";
import "./CurrentChatComponent.scss";
import { Chat } from "../../chats/models/chat.model";
import MessageListWrapper from "../../messages/components/message-list-wrapper/MessageListWrapper";
import CurrentChatTopBar from "../current-chat-top-bar/CurrentChatTopBar";
import CurrentChatInput from "../inputs/current-chat-input/CurrentChatInput";
import MediaModal from "../../media/components/media-modal/MediaModal";

interface Props {
  currentChat: Chat;
}

const CurrentChatComponent: FC<Props> = ({ currentChat }) => {
  return (
    <div className="main_chat_container main_section">
      <CurrentChatTopBar />
      <MessageListWrapper currentChat={currentChat} />
      <CurrentChatInput />
      <MediaModal />
    </div>
  );
};

export default CurrentChatComponent;
