import {useEffect, useRef} from "react";
import {useSelector} from "react-redux";
import {selectMessages} from "../redux/messages.reducer";
import {IMessage} from "../types/types";

export const useAutoScroll = (unread: number) => {
    const {messages, loading} = useSelector(selectMessages);

    const scrollRef = useRef<HTMLUListElement | null>(null);

    // jump to the last message the user has seen
    useEffect(() => {
        const messageId = messages[messages.length - unread - 1]?.messageId
        const last = document.getElementById('message-' + messageId);
        if (!last) return;
        last.setAttribute('style', 'background-color: #ffa099')
        last.scrollIntoView()
    }, [loading])

    // jump to bottom when new message is added
    useEffect(() => {
        const list = scrollRef.current;
        if (list) {
            list.scrollTop = list.scrollHeight;
        }
    }, [messages])

    return scrollRef;
}
