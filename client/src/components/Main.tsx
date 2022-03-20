import React, {FC, useEffect, useState} from 'react';
import MainChat from "./chat/MainChat";
import {useSocket} from "../hooks/socket";
import {useAppDispatch} from "../redux/store";
import {chatThunk, selectChats, setChats} from "../redux/chats.reducer";
import ChatsContainer from "./chat-sidebar/ChatsContainer";
import {IChat} from "../types/types";

const Main: FC = () => {

    const [chat, setChat] = useState<IChat | null>(null);
    const [socket] = useSocket();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(chatThunk(localStorage.getItem('user') || ''))
    }, []);

    return (
        <div className="main">
            <ChatsContainer chat={chat} setChat={setChat}/>
            {
                chat ?
                    <MainChat
                        socket={socket}
                        chat={chat}
                        setChat={setChat}
                    />
                    : <div className="chat_container main_section">
                        Please select a chat
                    </div>
            }
            <div className="right main_section">C</div>
        </div>
    );
};

export default Main;
