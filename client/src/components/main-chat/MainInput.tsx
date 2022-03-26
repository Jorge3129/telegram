import React, {FC, useEffect, useRef, MouseEvent} from 'react';
import {Socket} from 'socket.io-client'
import message from "./Message";
import {useAppDispatch} from "../../redux/store";
import {addMessage, messageThunk, selectMessages} from "./messages.reducer";
import {setLastMessage, setUnread} from "../chat-sidebar/chats.reducer";
import {useSelector} from "react-redux";
import {selectMainChat, setText} from "./main.chat.reducer";
import FileInput from "./FileInput";
import {useSend} from "./hooks/useSend";

interface IMainInput {
    socket: Socket;
}

const MainInput: FC<IMainInput> = ({socket}) => {

    const {messages} = useSelector(selectMessages);
    const {text} = useSelector(selectMainChat);
    const dispatch = useAppDispatch();

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [text]);

    const sendMessage = useSend(socket)

    const handleSubmit = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault()
        sendMessage()
    }

    return (
        <div className="chat_input_container">
            <form className="chat_input_form">
                <FileInput socket={socket}/>
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
                        onClick={handleSubmit}
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
