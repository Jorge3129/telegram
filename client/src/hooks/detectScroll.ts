import {MutableRefObject, UIEvent, useRef} from "react";
import {getVisibleHeight} from "./scrollUtils";
import {selectChats, setUnread} from "../redux/chats.reducer";
import {useSelector} from "react-redux";
import {IChat, IMessage} from "../types/types";
import {useAppDispatch} from "../redux/store";
import {Socket} from "socket.io-client";

export const useDetectScroll = (
    socket: Socket | null,
    scrollRef: MutableRefObject<HTMLUListElement | null>,
    chat: IChat,
    messages: IMessage[]
) => {

    const {chats, loading} = useSelector(selectChats);
    const dispatch = useAppDispatch();
    const readRef = useRef<number[]>([]);
    const topRef = useRef<number>(scrollRef.current?.scrollTop || 0);

    return (e: UIEvent<HTMLUListElement>) => {
        const unr = chats.find(ch => ch.id === chat.id)?.unread;
        if (!unr) return;
        //console.log(unr)

        if (!scrollRef.current?.scrollTop || topRef.current > scrollRef.current?.scrollTop)
            return (topRef.current = scrollRef.current?.scrollTop || 0)

        topRef.current = scrollRef.current?.scrollTop || 0;

        const divs = Array.from(document.querySelectorAll('.message_list_item'));

        const visible = divs.filter((el, i) => {
            const visibleHeight = getVisibleHeight(el, scrollRef.current);
            return visibleHeight > 0 && visibleHeight === el.clientHeight;
        }).map(el => parseInt(el.id.split('-')[1]))

        const last = [...visible].pop();
        if (last && last !== [...readRef.current].pop()) {
            //console.log(last)
            readRef.current.push(last);
            const msgRead = messages.find(msg => msg.messageId === last)
            if (msgRead) {
                const ind = messages.indexOf(msgRead);
                dispatch(setUnread({unread: messages.slice(ind + 1).length, chatId: chat.id}))
                if(!socket) return;
                socket.emit('read', {message: msgRead, username: localStorage.getItem('user')})
            }
        }
    };
}

