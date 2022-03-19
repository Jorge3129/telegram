import {useEffect, useRef} from "react";
import {useSelector} from "react-redux";
import {selectMessages} from "../redux/messages.reducer";
import {IMessage} from "../types/types";

export const useAutoScroll = () => {
    const {messages, loading} = useSelector(selectMessages);

    const scrollRef = useRef<HTMLUListElement | null>(null);

    useEffect(() => {
        const list = scrollRef.current;
        if (list) {
            list.scrollTop = list.scrollHeight;
        }
    }, [messages, loading])

    return scrollRef;
}
