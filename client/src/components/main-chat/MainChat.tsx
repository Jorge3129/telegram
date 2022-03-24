import React, {FC, useEffect} from 'react';
import './styles/Chat.css'
import './styles/Messages.css'
import MainInput from "./MainInput";
import Message from "./Message"
import {useAutoScroll} from "../../hooks/autoScroll";
import {Socket} from "socket.io-client";
import {useSelector} from "react-redux";
import {messageThunk, selectMessages} from "./messages.reducer";
import {useAppDispatch} from "../../redux/store";
import {useDetectScroll} from "../../hooks/detectScroll";
import {selectMainChat} from "./main.chat.reducer";

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
        messages.map((msg, i, {length}) => (
            <li
                className={"message_list_item" + (msg.author === localStorage.getItem('user') ? ' self' : '')}
                key={msg.timestamp + Math.random()}
                id={'message-' + msg.messageId}
            >
                <Message msg={msg}
                         callback={i === length - 1 ? onMessagesFirstRendered : null}
                />
                {msg.messageId}
                {msg.author.split('')[0]}
            </li>
        ))

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
                : <></>}
        </div>
    );
};

export default MainChat;
