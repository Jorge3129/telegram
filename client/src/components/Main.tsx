import React, {FC, useEffect, useState} from 'react';
import MainChat from "./main-chat/MainChat";
import {useSocket} from "../hooks/socket";
import {useAppDispatch} from "../redux/store";
import {chatThunk, selectChats, setChats} from "./chat-sidebar/chats.reducer";
import ChatsContainer from "./chat-sidebar/ChatsContainer";
import {IChat} from "../types/types";
import {useSelector} from "react-redux";
import {selectMainChat} from "./main-chat/main.chat.reducer";
import MediaSidebar from "./media-sidebar/MediaSidebar";

const Main: FC = () => {

    const {chatId} = useSelector(selectMainChat);
    const [socket] = useSocket();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(chatThunk(localStorage.getItem('user') || ''))
    }, []);

    return (
        <div className="main">
            <ChatsContainer/>
            {
                chatId ?
                    <MainChat
                        socket={socket}
                    />
                    : <div className="chat_container main_section">
                        Please select a chat
                    </div>
            }
            <MediaSidebar/>
        </div>
    );
};

export default Main;
