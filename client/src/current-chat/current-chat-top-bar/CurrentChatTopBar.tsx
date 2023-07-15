import { FC } from "react";
import "./CurrentChatTopBar.scss";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/store";
import {
  selectCurrentChat,
  CurrentChatActions,
} from "../reducers/current-chat.reducer";

interface Props {}

const CurrentChatTopBar: FC<Props> = () => {
  const { currentChat } = useSelector(selectCurrentChat);
  const dispatch = useAppDispatch();

  const backToChats = () => {
    dispatch(CurrentChatActions.clearCurrentChat());
  };

  return (
    <div className="chat_top_bar">
      <div className="chat_top_bar_back icon_container" onClick={backToChats}>
        <i className="fa-solid fa-arrow-left chat_top_bar_icon" />
      </div>

      <div className="chat_top_bar_title_container">
        <div className="chat_top_bar_title">{currentChat?.title || ""}</div>

        <div className="chat_top_bar_members">Last seen</div>
      </div>

      <div className="chat_top_bar_separator"></div>

      <div className="chat_top_bar_nav">
        <div className="chat_top_bar_search icon_container">
          <i className="fa-solid fa-magnifying-glass chat_top_bar_icon" />
        </div>

        <div className="chat_top_bar_info icon_container">
          <i className="fa-solid fa-table-columns chat_top_bar_icon" />
        </div>

        <div className="chat_top_bar_menu icon_container">
          <i className="fa-solid fa-ellipsis-vertical chat_top_bar_icon" />
        </div>
      </div>
    </div>
  );
};

export default CurrentChatTopBar;
