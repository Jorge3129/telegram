import { FC, useMemo, useState } from "react";
import "./ChatsContainer.scss";
import _ from "lodash";
import { useSelector } from "react-redux";
import { selectCurrentChat } from "../../../current-chat/reducers/current-chat.reducer";
import { selectChats } from "../../chats.reducer";
import { Chat } from "../../models/chat.model";
import ChatsList from "../chats-list/ChatsList";
import { classIf } from "../../../utils/class-if";
import ChatsSearchBar from "../chats-search-bar/ChatsSearchBar";

const ChatsContainer: FC = () => {
  const { chats, loading } = useSelector(selectChats);
  const { currentChat } = useSelector(selectCurrentChat);

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

  return (
    <div
      className={
        "chats_container main_section" +
        classIf(!!currentChat, "main_chat_active")
      }
    >
      <ChatsSearchBar searchItem={searchItem} setSearchItem={setSearchItem} />
      <ChatsList chats={filteredChats} loading={loading} />
    </div>
  );
};

export default ChatsContainer;
