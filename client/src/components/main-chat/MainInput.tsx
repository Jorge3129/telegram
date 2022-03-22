import React, {FC, useEffect, useRef, useState} from 'react';
import {Socket} from 'socket.io-client'
import message from "./Message";
import {useAppDispatch} from "../../redux/store";
import {addMessage, messageThunk, selectMessages} from "./messages.reducer";
import {setLastMessage, setUnread} from "../chat-sidebar/chats.reducer";
import {useSelector} from "react-redux";
import {selectMainChat, setText} from "./main.chat.reducer";

interface IMainInput {
    socket: Socket;
}

const MainInput: FC<IMainInput> = ({socket}) => {

    const {messages} = useSelector(selectMessages);
    const {chatId, text} = useSelector(selectMainChat);
    const dispatch = useAppDispatch();

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [text]);

    const handleSend = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const message = {
            text,
            timestamp: new Date().toISOString(),
            author: localStorage.getItem('user') || '',
            chatId: chatId || 0,
            messageId: messages.length
        }

        socket.emit('message', {message})

        dispatch(addMessage(message));
        dispatch(setLastMessage({message, chatId: message.chatId}));
        dispatch(setText(''))
        dispatch(setUnread({unread: 0, chatId: message.chatId}))
    }

    return (
        <div className="chat_input_container">
            <form className="chat_input_form">
                <i className="fa-solid fa-paperclip add_media input_icon"/>
                <input
                    type="text"
                    className="chat_input"
                    placeholder=" Write a message..."
                    value={text}
                    ref={inputRef}
                    onChange={(e) => dispatch(setText(e.target.value))}
                />
                {(text && <button
                        type="submit"
                        className="chat_send_button"
                        onClick={handleSend}
                    >
                        <i className="fa-solid fa-paper-plane"/>
                    </button>) ||
                    <div style={{display: 'flex', flexDirection: 'row', width: '3em', justifyContent: 'space-between'}}>
                        <i className="fa-solid fa-microphone input_icon"/>
                        <i className="fa-solid fa-face-smile input_icon"/>
                    </div>
                }
            </form>
        </div>
    );
};

export default MainInput;
