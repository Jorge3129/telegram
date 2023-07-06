import { MouseEvent } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/store";
import {
  selectCurrentChat,
  CurrentChatActions,
} from "./reducers/main.chat.reducer";

const MainTopBar = () => {
  const { currentChat } = useSelector(selectCurrentChat);
  const dispatch = useAppDispatch();

  const backToChats = (e: MouseEvent) => {
    dispatch(CurrentChatActions.clearCurrentChat());
  };

  return (
    <ul className="chat_top_bar">
      <li
        className="chat_top_bar_back input_icon_container"
        onClick={backToChats}
      >
        <i className="fa-solid fa-arrow-left main_chat_icon_top" />
      </li>
      <li className="chat_top_bar_title_container">
        <div className="chat_top_bar_title">{currentChat?.title || ""}</div>
        <div className="chat_top_bar_members">Last seen</div>
      </li>
      <li className="chat_top_bar_separator"></li>
      <li className="chat_top_bar_search input_icon_container">
        <i className="fa-solid fa-magnifying-glass main_chat_icon_top" />
      </li>
      <li className="chat_top_bar_info input_icon_container">
        <i className="fa-solid fa-table-columns main_chat_icon_top" />
      </li>
      <li className="chat_top_bar_menu input_icon_container">
        <i className="fa-solid fa-ellipsis-vertical main_chat_icon_top" />
      </li>
    </ul>
  );
};

export default MainTopBar;
