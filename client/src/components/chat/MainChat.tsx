import React, {FC, useEffect, UIEvent, useRef, Dispatch, SetStateAction} from 'react';
import './styles/Chat.css'
import './styles/Messages.css'
import MainInput from "./MainInput";
import Message from "./Message"
import {useAutoScroll} from "../../hooks/autoScroll";
import {Socket} from "socket.io-client";
import {useSelector} from "react-redux";
import {messageThunk, selectMessages} from "../../redux/messages.reducer";
import {useAppDispatch} from "../../redux/store";
import {IChat} from "../../types/types";
import {useDetectScroll} from "../../hooks/detectScroll";

interface IMainChat {
    chat: IChat
    setChat: Dispatch<SetStateAction<IChat | null>>
    socket: Socket | null
}

const MainChat: FC<IMainChat> = ({chat, setChat, socket}) => {
    const {messages, loading} = useSelector(selectMessages);
    const scrollRef = useAutoScroll(chat.unread);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(messageThunk(chat.id));
    }, [chat]);

    const ref = useRef<number[]>([]);
    const topRef = useRef<number>(scrollRef.current?.scrollTop || 0);

    const handleScroll = useDetectScroll(topRef, scrollRef, ref, chat, messages)

    const messageList = loading ? <li key={"loading"}>Loading...</li> :
        messages.map(msg => (
            <li
                className={"message_list_item" + (msg.author === localStorage.getItem('user') ? ' self' : '')}
                key={msg.timestamp + Math.random()}
                id={'message-' + msg.messageId}
            >
                <Message msg={msg}/>
                {msg.messageId}
            </li>
        ))

    return (
        <div className="chat_container main_section">
            <div className="chat_top_bar">
                {chat.title}
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
                    chat={chat}
                />
                : <></>}
        </div>
    );
};

export default MainChat;
