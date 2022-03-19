import React, {FC, useState} from 'react';
import {Socket} from 'socket.io-client'
import message from "./Message";
import {useAppDispatch} from "../../redux/store";
import {addMessage} from "../../redux/messages.reducer";

interface IMainInput {
    socket: Socket;
}

const MainInput: FC<IMainInput> = ({socket}) => {

    const [text, setText] = useState<string>('');
    const dispatch = useAppDispatch();

    const handleSend = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        socket.emit('message',
            {
                message: text,
                receiver: localStorage.getItem('user') === 'a' ? 'b' : 'a'
            })

        dispatch(addMessage(
            {
                text,
                timestamp: new Date().toISOString(),
                author: localStorage.getItem('user') || ''
            }
        ));
        setText('');
    }

    return (
        <div className="chat_input_container">
            <form className="chat_input_form">
                <input
                    type="text"
                    className="chat_input_text"
                    placeholder="Enter message ..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                {text && <button
                    type="submit"
                    className="chat_send_button"
                    onClick={handleSend}
                >
                    Send
                </button>}
            </form>
        </div>
    );
};

export default MainInput;
