import {MutableRefObject, UIEvent, useEffect, useRef} from "react";
import {calculateUnread, getVisibleHeight} from "./scrollUtils";
import {selectChats, setUnread} from "../../chat-sidebar/chats.reducer";
import {useSelector} from "react-redux";
import {IChat, IMessage} from "../../../types/types";
import {useAppDispatch} from "../../../redux/store";
import {Socket} from "socket.io-client";
import {selectMainChat} from "../main.chat.reducer";
import {alreadySeen, getMsgById} from "../../../utils/general.utils";

export const useDetectScroll = (
    socket: Socket | null,
    scrollRef: MutableRefObject<HTMLUListElement | null>,
    messages: IMessage[]
) => {

    const {chats, loading} = useSelector(selectChats);
    const {chatId, mainChat} = useSelector(selectMainChat);
    const dispatch = useAppDispatch();
    const readRef = useRef<number[]>([]);
    const topRef = useRef<number>(scrollRef.current?.scrollTop || 0);

    const getVisibleMessages = () => {
        const divs = Array.from(document.querySelectorAll('.message_list_item'));

        const visible = divs
            .filter((el, i) => {
                const seen = getVisibleHeight(el, scrollRef.current);
                return seen > 0 && seen === el.clientHeight;
            })
            .map(el => parseInt(el.id.split('-')[1]))

        return visible;
    }

    const getLastVisibleMessage = () => [...getVisibleMessages()].pop();

    const emitReadEvent = (searchedId: number) => {
        const msgRead = messages.find(msg => msg.messageId === searchedId);
        if (msgRead) {
            //console.log('read event' + msgRead.messageId)
            const ind = messages.indexOf(msgRead);
            //console.log('setUnread scroll')
            dispatch(setUnread({unread: messages.slice(ind + 1).length, chatId: chatId || -1}))
            if (!socket) return;
            socket.emit('read', {message: msgRead, username: localStorage.getItem('user')})
        }
    }

    const onMessagesFirstRendered = () => {
        //console.log('onFirstRendered')
        const last = getLastVisibleMessage();
        if (!mainChat || (!last && last !== 0)) return;
        const msg = getMsgById(last, chatId || 0, messages);
        if (!msg) return;
        if (!alreadySeen(msg.timestamp, mainChat?.unread, messages)) {
            //console.log('read this')
            emitReadEvent(last)
        }
    }

    const handleScroll = (e: UIEvent<HTMLUListElement>) => {
        //console.log('handleScroll')
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

