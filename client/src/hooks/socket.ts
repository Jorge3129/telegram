import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {io, Socket} from "socket.io-client";
import {addMessage} from "../redux/messages.reducer";
import {useAppDispatch} from "../redux/store";
import {SERVER_WS_URL} from "../config";
import {IChat, IMessage} from "../types/types";
import {incrementUnread, setLastMessage, setOnline, setUnread} from "../redux/chats.reducer";
import {useSelector} from "react-redux";
import {selectMainChat} from "../redux/main.chat.reducer";

export const useSocket = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const dispatch = useAppDispatch();
    const {chatId} = useSelector(selectMainChat);

    const onMessage = (data: IMessage) => {
        console.log('LOOL')
        console.log(chatId)
        if (chatId === data.chatId) {
            dispatch(addMessage(data))
        }
        dispatch(setLastMessage({message: data, chatId: data.chatId}))
        dispatch(incrementUnread({chatId: data.chatId}))
    }

    useEffect(() => {
        const newSocket = io(`${SERVER_WS_URL}`, {
            query: {username: localStorage.getItem('user')}
        });
        newSocket.on('message-to-client', onMessage)
        newSocket.on('online-change', ({online, chatId}) => {
            console.log(online, chatId)
            dispatch(setOnline({online, chatId}));
        })
        setSocket(newSocket);
        return () => {
            newSocket.close()
        };
    }, [])

    useEffect(() => {
        console.log('HI!')
        if (!socket) return;
        socket.off('message-to-client')
        socket.on('message-to-client', onMessage)
    }, [chatId]);

    return [socket, setSocket] as
        [Socket | null, Dispatch<SetStateAction<Socket | null>>];
}
