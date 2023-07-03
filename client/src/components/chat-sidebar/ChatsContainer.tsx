import { FC, MouseEvent, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { selectChats } from "./chats.reducer";
import ChatItem from "./ChatItem";
import "./styles/Chats.css";
import * as _ from "lodash";
import { useAppDispatch } from "../../redux/store";
import {
  selectMainChat,
  setChat,
  setChatId,
} from "../main-chat/reducers/main.chat.reducer";
import ChatsSearchBar from "./ChatsSearchBar";
import LoadSpinner from "../reuse/LoadSpinner";
import { Chat } from "../../chats/models/chat.model";

interface IChatsContainer {}

const ChatsContainer: FC<IChatsContainer> = () => {
  const { chats, loading, width } = useSelector(selectChats);
  const { currentChatId, mainChat } = useSelector(selectMainChat);
  const dispatch = useAppDispatch();

  const handleChat = (e: MouseEvent<HTMLButtonElement>) => {
    const chatId = parseInt(e.currentTarget.id);
    const chatObject = chats.find((ch) => ch.id === chatId);
    if (chatObject) dispatch(setChat(chatObject));
    dispatch(setChatId(chatId));
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
    if (!searchItem) return sortedChats;
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
          onClick={handleChat}
        >
          <ChatItem chat={ch} />
        </button>
      </li>
    ))
  );

  const chatClass = () => (mainChat ? " main_chat_active" : "");

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
