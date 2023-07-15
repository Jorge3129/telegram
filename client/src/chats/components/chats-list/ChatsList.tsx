import { FC } from "react";
import "./ChatsList.scss";
import LoadingSpinner from "../../../shared/components/loading-spinner/LoadingSpinner";
import { Chat } from "../../models/chat.model";
import {
  CurrentChatActions,
  selectCurrentChat,
} from "../../../current-chat/reducers/current-chat.reducer";
import { useAppDispatch } from "../../../redux/store";
import { useSelector } from "react-redux";
import { classIf } from "../../../utils/class-if";
import ChatItem from "../chat-item/ChatItem";

interface Props {
  chats: Chat[];
  loading: boolean;
}

const ChatsList: FC<Props> = ({ chats, loading }) => {
  const dispatch = useAppDispatch();

  const handleSelectChat = (chat: Chat) => {
    dispatch(CurrentChatActions.setChat(chat));
    dispatch(CurrentChatActions.setChatId(chat.id));
  };

  const { currentChatId } = useSelector(selectCurrentChat);

  return (
    <ul className="chat_list">
      {loading ? (
        <LoadingSpinner backgroundColor={"var(--white"} />
      ) : (
        chats.map((chat: Chat) => (
          <li key={`${chat.id}`} className="chat_list_item">
            <button
              className={
                "chat_item_button " +
                classIf(currentChatId === chat.id, "selected_chat")
              }
              onClick={() => handleSelectChat(chat)}
            >
              <ChatItem chat={chat} selected={currentChatId === chat.id} />
            </button>
          </li>
        ))
      )}
    </ul>
  );
};

export default ChatsList;
