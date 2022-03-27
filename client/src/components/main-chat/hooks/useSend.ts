import React, {Dispatch, useEffect, useState} from "react";
import {addMessage, selectMessages} from "../reducers/messages.reducer";
import {setLastMessage, setUnread} from "../../chat-sidebar/chats.reducer";
import {selectMainChat, setText} from "../reducers/main.chat.reducer";
import {useAppDispatch} from "../../../redux/store";
import {useSelector} from "react-redux";
import {Socket} from "socket.io-client";
import {IMessage} from "../../../types/types";

export const useSend = (socket: Socket) => {

    const {messages} = useSelector(selectMessages);
    const {chatId, text, media} = useSelector(selectMainChat);
    const dispatch = useAppDispatch();

    const dispatchSendMessage = (message: IMessage) => {
        dispatch(addMessage(message));
        dispatch(setLastMessage({message, chatId: message.chatId}));
        dispatch(setText(''))
        //dispatch(setSrc(''))
        dispatch(setUnread({unread: 0, chatId: message.chatId}))
    }

    const createMessage = (id: number) => ({
        text,
        timestamp: new Date().toISOString(),
        author: localStorage.getItem('user') || '',
        chatId: chatId || 0,
        messageId: id,
        media
    })

    const handleSend = () => {
        const lastMsg = messages.at(-1)
        const id = lastMsg ? lastMsg.messageId + 1 : messages.length;
        const message = createMessage(id)

        socket.emit('message', {message})
        dispatchSendMessage(message)
    }

    return handleSend;
}
