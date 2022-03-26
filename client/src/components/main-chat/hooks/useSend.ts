import React, {Dispatch, useEffect, useState} from "react";
import {addMessage, selectMessages} from "../messages.reducer";
import {setLastMessage, setUnread} from "../../chat-sidebar/chats.reducer";
import {selectMainChat, setSrc, setText} from "../main.chat.reducer";
import {useAppDispatch} from "../../../redux/store";
import {useSelector} from "react-redux";
import {Socket} from "socket.io-client";
import {IMessage} from "../../../types/types";

export const dispatchSendMessage = (dispatch: Dispatch<any>, message: IMessage) => {
    dispatch(addMessage(message));
    dispatch(setLastMessage({message, chatId: message.chatId}));
    dispatch(setText(''))
    //dispatch(setSrc(''))
    dispatch(setUnread({unread: 0, chatId: message.chatId}))
}

export const useSend = (socket: Socket) => {

    const {messages} = useSelector(selectMessages);
    const {chatId, text, src} = useSelector(selectMainChat);
    const dispatch = useAppDispatch();

    const handleSend = () => {
        const lastMsg = messages.at(-1)
        console.log(src)

        const message = {
            text,
            timestamp: new Date().toISOString(),
            author: localStorage.getItem('user') || '',
            chatId: chatId || 0,
            messageId: lastMsg ? lastMsg.messageId + 1 : messages.length,
            src
        }

        socket.emit('message', {message})

        dispatchSendMessage(dispatch, message)
    }

    return handleSend;
}
