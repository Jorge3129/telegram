import {MutableRefObject, UIEvent, useEffect, useRef} from "react";
import {getVisibleHeight} from "./scrollUtils";
import {selectChats, setUnread} from "../components/chat-sidebar/chats.reducer";
import {useSelector} from "react-redux";
import {IChat, IMessage} from "../types/types";
import {useAppDispatch} from "../redux/store";
import {Socket} from "socket.io-client";
import {selectMainChat} from "../components/main-chat/main.chat.reducer";

export const useDetectScroll = (
    socket: Socket | null,
    scrollRef: MutableRefObject<HTMLUListElement | null>,
    messages: IMessage[]
) => {

    const {chats, loading} = useSelector(selectChats);
    const {chatId} = useSelector(selectMainChat);
    const dispatch = useAppDispatch();
    const readRef = useRef<number[]>([]);
    const topRef = useRef<number>(scrollRef.current?.scrollTop || 0);

    const getLastVisibleMessage = () => {
        const divs = Array.from(document.querySelectorAll('.message_list_item'));

        const visible = divs.filter((el, i) => {
            const seen = getVisibleHeight(el, scrollRef.current);
            return seen > 0 && seen === el.clientHeight;
        }).map(el => parseInt(el.id.split('-')[1]))

        return [...visible].pop();
    }

    const emitReadEvent = (searchedId: number) => {
        const msgRead = messages.find(msg => msg.messageId === searchedId)
        if (msgRead) {
            const ind = messages.indexOf(msgRead);
            dispatch(setUnread({unread: messages.slice(ind + 1).length, chatId: chatId || -1}))
            if (!socket) return;
            socket.emit('read', {message: msgRead, username: localStorage.getItem('user')})
        }
    }

    const onMessagesFirstRendered = () => {
        const last = getLastVisibleMessage();
        //console.log('last: ' + last)
        if (last || last === 0) emitReadEvent(last);
    }

    const handleScroll = (e: UIEvent<HTMLUListElement>) => {
        const unr = chats.find(ch => ch.id === chatId)?.unread;
        if (!unr) return;

        if (!scrollRef.current?.scrollTop || topRef.current > scrollRef.current?.scrollTop)
            return (topRef.current = scrollRef.current?.scrollTop || 0)

        topRef.current = scrollRef.current?.scrollTop || 0;

        const last = getLastVisibleMessage();

        if (last && last !== [...readRef.current].pop()) {
            readRef.current.push(last);
            emitReadEvent(last);
        }
    };

    return {onMessagesFirstRendered, handleScroll};
}

