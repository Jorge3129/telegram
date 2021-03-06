import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {io, Socket} from "socket.io-client";
import {addMessage, setSeenMessage} from "../components/main-chat/reducers/messages.reducer";
import {useAppDispatch} from "../redux/store";
import {SERVER_WS_URL} from "../config";
import {IChat, IMessage} from "../types/types";
import {
    incrementUnread,
    setLastMessage,
    setOnline,
    setSeenLastMessage,
} from "../components/chat-sidebar/chats.reducer";
import {useSelector} from "react-redux";
import {selectMainChat} from "../components/main-chat/reducers/main.chat.reducer";

export const useSocket = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const dispatch = useAppDispatch();
    const {chatId} = useSelector(selectMainChat);

    const onMessage = (msg: IMessage) => {
        //console.log('message')
        if (chatId === msg.chatId) {
            dispatch(addMessage(msg))
        }
        dispatch(setLastMessage({message: msg, chatId: msg.chatId}))
        dispatch(incrementUnread({chatId: msg.chatId}))
    }

    const onSeen = ({message, username}: { message: IMessage, username: string }) => {
        //console.log(chatId)
        if (chatId === message.chatId) {
            dispatch(setSeenMessage({message, username}))
        }
        dispatch(setSeenLastMessage({message}))
    }

    useEffect(() => {
        const newSocket = io(`${SERVER_WS_URL}`, {
            query: {username: localStorage.getItem('user')}
        });
        newSocket.on('message-to-client', onMessage)
        newSocket.on('online-change', ({online, chatId}) => {
            dispatch(setOnline({online, chatId}));
        })
        newSocket.on('seen', onSeen)
        setSocket(newSocket);
        return () => {
            newSocket.close()
        };
    }, [])

    useEffect(() => {
        if (!socket) return;
        socket.off('message-to-client')
        socket.on('message-to-client', onMessage)
        socket.off('seen')
        socket.on('seen', onSeen)
    }, [chatId]);

    return [socket, setSocket] as
        [Socket | null, Dispatch<SetStateAction<Socket | null>>];
}
