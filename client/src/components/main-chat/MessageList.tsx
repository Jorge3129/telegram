import Message from "./Message";
import React, {FC, useEffect} from "react";
import {isSelf} from "../../utils/general.utils";
import {useSelector} from "react-redux";
import {messageThunk, selectMessages} from "./reducers/messages.reducer";
import {selectMainChat} from "./reducers/main.chat.reducer";
import {useAutoScroll} from "./hooks/useAutoScroll";
import {useDetectScroll} from "./hooks/useDetectScroll";
import {Socket} from "socket.io-client";
import {useAppDispatch} from "../../redux/store";
import MessageAvatar from "../reuse/MessageAvatar";

interface IMessageList {
    socket: Socket;
}

const MessageList: FC<IMessageList> = ({socket}) => {

    const {messages, loading} = useSelector(selectMessages);
    const {chatId, mainChat} = useSelector(selectMainChat);
    const scrollRef = useAutoScroll(mainChat?.unread || 0);
    const {onMessagesFirstRendered, handleScroll} = useDetectScroll(socket, scrollRef, messages)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(messageThunk(chatId || -1));
    }, [chatId]);


    if (loading) return <li key={"loading"}>Loading...</li>;

    return (
        <div className="message_list_wrapper">
            <ul
                className={"message_list" + (loading ? ' msg-loading' : '')}
                ref={scrollRef}
                onScroll={handleScroll}
            >
                {messages.map((msg, i, {length}) =>
                    <li
                        className={"message_list_item" + (isSelf(msg) ? ' self' : '')}
                        key={msg.messageId}
                        id={'message-' + msg.messageId}
                    >
                        <MessageAvatar data={{mainChat, msg, nextMsg: messages[i + 1]}}/>
                        <Message
                            msg={msg}
                            callback={i === length - 1 ? onMessagesFirstRendered : null}
                            type={mainChat?.type || 'personal'}
                        />
                        {msg.messageId}
                        {false && msg.author.split('')[0]}
                    </li>
                )}
            </ul>
        </div>
    );
}


export default MessageList;
