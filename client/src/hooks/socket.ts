import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {io, Socket} from "socket.io-client";
import {addMessage} from "../redux/messages.reducer";
import {useAppDispatch} from "../redux/store";
import {SERVER_WS_URL} from "../config";
import {IMessage} from "../types/types";
import {incrementUnread, setLastMessage, setUnread} from "../redux/chats.reducer";
import {useSelector} from "react-redux";
import {selectMainChat} from "../redux/main.chat.reducer";

export const useSocket = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const dispatch = useAppDispatch();
    const {chatId} = useSelector(selectMainChat);

    useEffect(() => {
        const newSocket = io(`${SERVER_WS_URL}`, {
            query: {
                username: localStorage.getItem('user')
            }
        });

        newSocket.on('message-to-client', (data: IMessage) => {
            //console.log(data)
            dispatch(addMessage(data))
            //console.log(chatId)
            if (chatId) {
                dispatch(setLastMessage({message: data, chatId}))
                dispatch(incrementUnread({chatId}))
            }
        })

        setSocket(newSocket);
        return () => {
            newSocket.close()
        };
    }, [])

    return [socket, setSocket] as
        [Socket | null, Dispatch<SetStateAction<Socket | null>>];
}
