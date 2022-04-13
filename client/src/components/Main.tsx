import React, {FC, MouseEvent, useEffect, useState} from 'react';
import MainChat from "./main-chat/MainChat";
import {useSocket} from "../socket/socket";
import {useAppDispatch} from "../redux/store";
import {chatThunk} from "./chat-sidebar/chats.reducer";
import ChatsContainer from "./chat-sidebar/ChatsContainer";
import {useSelector} from "react-redux";
import {selectMainChat} from "./main-chat/reducers/main.chat.reducer";
import MediaSidebar from "./media-sidebar/MediaSidebar";
import {setContextMenu} from "./main-chat/reducers/menu.reducer";
import MainPlaceholder from "./MainPlaceholder";

const Main: FC = () => {

    const {chatId} = useSelector(selectMainChat);
    const [socket] = useSocket();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(chatThunk(localStorage.getItem('user') || ''))
    }, []);

    const [error, setError] = useState(false);

    const throwError = (e: MouseEvent<HTMLButtonElement>) => {
        setError(true)
        throw new Error('LOOLERROR')
    }

    return (
        <div className="main" onClick={e => dispatch(setContextMenu(null))}>
            <button className="error_button" onClick={throwError}>Throw error</button>
            <ChatsContainer/>
            {chatId
                ?
                <div className="main_chat_media_container">
                    <MainChat
                        socket={socket}
                    />
                    <MediaSidebar/>
                </div>
                :
                <MainPlaceholder/>
            }

        </div>
    );
};

export default Main;
