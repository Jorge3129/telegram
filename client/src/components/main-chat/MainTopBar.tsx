import React, {MouseEvent} from 'react';
import {useSelector} from "react-redux";
import {clearMainChat, selectMainChat, setChat} from "./reducers/main.chat.reducer";
import {useAppDispatch} from "../../redux/store";
import {setChatsWidth} from "../chat-sidebar/chats.reducer";

const MainTopBar = () => {
    const {mainChat} = useSelector(selectMainChat);
    const dispatch = useAppDispatch();

    const backToChats = (e: MouseEvent) => {
        dispatch(clearMainChat());
    }

    return (
        <ul className="chat_top_bar">
            <li className="chat_top_bar_back input_icon_container" onClick={backToChats}>
                <i className="fa-solid fa-arrow-left main_chat_icon_top"/>
            </li>
            <li className="chat_top_bar_title_container">
                <div className="chat_top_bar_title">
                    {mainChat?.title || ''}
                </div>
                <div className="chat_top_bar_members">
                    Last seen
                </div>
            </li>
            <li className="chat_top_bar_separator">

            </li>
            <li className="chat_top_bar_search input_icon_container">
                <i className="fa-solid fa-magnifying-glass main_chat_icon_top"/>
            </li>
            <li className="chat_top_bar_info input_icon_container">
                <i className="fa-solid fa-table-columns main_chat_icon_top"/>
            </li>
            <li className="chat_top_bar_menu input_icon_container">
                <i className="fa-solid fa-ellipsis-vertical main_chat_icon_top"/>
            </li>
        </ul>
    );
};

export default MainTopBar;
