import { FC, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { selectChats } from "../../chats/chats.reducer";
import ChatItem from "./ChatItem";
import "./styles/Chats.css";
import * as _ from "lodash";
import { useAppDispatch } from "../../redux/store";

import ChatsSearchBar from "./ChatsSearchBar";
import { Chat } from "../../chats/models/chat.model";
import LoadSpinner from "../../components/reuse/LoadSpinner";
import {
  selectCurrentChat,
  CurrentChatActions,
} from "../../current-chat/reducers/current-chat.reducer";

interface IChatsContainer {}

const ChatsContainer: FC<IChatsContainer> = () => {
  const { chats, loading, width } = useSelector(selectChats);
  const { currentChatId, currentChat } = useSelector(selectCurrentChat);

  const dispatch = useAppDispatch();

  const handleSelectChat = (chat: Chat) => {
    dispatch(CurrentChatActions.setChat(chat));
    dispatch(CurrentChatActions.setChatId(chat.id));
  };

  const sortedChats = useMemo(() => {
    return _.sortBy(chats, (ch: Chat) =>
      ch.lastMessage
        ? new Date(ch.lastMessage.timestamp)
        : new Date("1000-12-17T03:24:00")
    ).reverse();
  }, [chats]);

  const [searchItem, setSearchItem] = useState<string>("");

  const filteredChats = useMemo(() => {
    if (!searchItem) {
      return sortedChats;
    }

    return sortedChats.filter((chat) =>
      chat.title.toLowerCase().split("").includes(searchItem.toLowerCase())
    );
  }, [searchItem, sortedChats]);

  const chatList = loading ? (
    <LoadSpinner backgroundColor={"var(--white"} />
  ) : (
    filteredChats.map((ch: Chat) => (
      <li key={ch.id + ""} className="chat_list_item">
        <button
          className={
            "chat_item_button " +
            (currentChatId === ch.id ? " selected_chat" : "")
          }
          id={ch.id + ""}
          onClick={() => handleSelectChat(ch)}
        >
          <ChatItem chat={ch} />
        </button>
      </li>
    ))
  );

  const chatClass = () => (currentChat ? " main_chat_active" : "");

  return (
    <div
      className={"chats_container main_section" + chatClass()}
      style={width ? { width } : {}}
    >
      <ChatsSearchBar searchItem={searchItem} setSearchItem={setSearchItem} />
      <ul className="chat_list">{chatList}</ul>
    </div>
  );
};

export default ChatsContainer;
