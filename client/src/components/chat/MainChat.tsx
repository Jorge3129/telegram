import React, {FC, useEffect, useState} from 'react';
import './css/Chat.css'
import './css/Messages.css'
import MainInput from "./MainInput";
import Message from "./Message"
import {useAutoScroll} from "../../hooks/chat";
import {Socket} from "socket.io-client";
import {useSelector} from "react-redux";
import {messageThunk, selectMessages} from "../../redux/messages.reducer";
import {useAppDispatch} from "../../redux/store";

interface IMainChat {
    title?: string;
    socket: Socket | null
    chatId: number
}

const MainChat: FC<IMainChat> = ({title, socket, chatId}) => {
    const {messages, loading} = useSelector(selectMessages);
    const scrollRef = useAutoScroll();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(messageThunk(chatId));
    }, [chatId]);

    const messageList = loading ? <li key={"loading"}>Loading...</li> :
        messages.map(msg => (
            <li
                className={"message_list_item" + (msg.author === localStorage.getItem('user') ? ' self' : '')}
                key={msg.timestamp + Math.random()}
            >
                <Message msg={msg}/>
            </li>
        ))

    return (
        <div className="chat_container main_section">
            <div className="chat_top_bar">
                {title}
            </div>
            <div className="message_list_wrapper">
                <ul
                    className={"message_list" + (loading ? ' msg-loading' : '')}
                    ref={scrollRef}
                >
                    {messageList}
                </ul>
            </div>
            {socket ?
                <MainInput
                    socket={socket}
                />
                : <></>}
        </div>
    );
};

export default MainChat;
