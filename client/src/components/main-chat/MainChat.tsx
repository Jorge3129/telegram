import React, {FC, useEffect, MouseEvent, useState} from 'react';
import './styles/Chat.css'
import './styles/Messages.css'
import MainInput from "./MainInput";
import Message from "./Message"
import {useAutoScroll} from "./hooks/autoScroll";
import {Socket} from "socket.io-client";
import {useSelector} from "react-redux";
import {messageThunk, selectMessages} from "./messages.reducer";
import {useAppDispatch} from "../../redux/store";
import {useDetectScroll} from "./hooks/detectScroll";
import {selectMainChat} from "./main.chat.reducer";
import MessageList from "./MessageList";

interface IMainChat {
    socket: Socket | null
}

const MainChat: FC<IMainChat> = ({socket}) => {
    const {messages, loading} = useSelector(selectMessages);
    const {chatId, mainChat} = useSelector(selectMainChat);
    const scrollRef = useAutoScroll(mainChat?.unread || 0);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(messageThunk(chatId || -1));
    }, [chatId]);

    const {onMessagesFirstRendered, handleScroll} = useDetectScroll(socket, scrollRef, messages)

    const messageList = loading ? <li key={"loading"}>Loading...</li> :
        <MessageList
            messages={messages}
            onMessagesFirstRendered={onMessagesFirstRendered}
            mainChat={mainChat}
        />


    return (
        <div className="chat_container main_section">
            <div className="chat_top_bar">
                {mainChat?.title || ''}
            </div>
            <div className="message_list_wrapper">
                <ul
                    className={"message_list" + (loading ? ' msg-loading' : '')}
                    ref={scrollRef}
                    onScroll={handleScroll}
                >
                    {messageList}
                </ul>
            </div>
            {socket ?
                <MainInput
                    socket={socket}
                />
                : <></>
            }
        </div>
    );
};

export default MainChat;
