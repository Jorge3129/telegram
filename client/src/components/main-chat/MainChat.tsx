import React, {FC, MouseEvent} from 'react';
import './styles/MainChat.css'
import './styles/Messages.css'
import MainInputForm from "./MainInputForm";
import {Socket} from "socket.io-client";
import MessageList from "./MessageList";
import MediaModal from "./MediaModal";
import MainTopBar from "./MainTopBar";

interface IMainChat {
    socket: Socket | null
}

const MainChat: FC<IMainChat> = ({socket}) => {

    if (!socket) return <div className="error_message">
        <h1>Socket Error!</h1>
    </div>

    return (
        <div className="main_chat_container main_section">
            <MainTopBar/>
            <MessageList socket={socket}/>
            <MainInputForm socket={socket}/>
            <MediaModal socket={socket}/>
        </div>
    );
};

export default MainChat;
