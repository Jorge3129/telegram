import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {selectMessages} from "../messages.reducer";
import {IMessage} from "../../../types/types";
import {isSelf} from "../../../utils/general.utils";

export const useAutoScroll = (unread: number) => {
    const {messages, loading} = useSelector(selectMessages);
    const [messageLength, setMessageLength] = useState(messages?.length || 0);

    const scrollRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        if (messages.length === messageLength) return;
        setMessageLength(messages.length);
    }, [messages]);


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
        //console.log(messageLength)
        const list = scrollRef.current;
        if (list && messages
            && isSelf(messages.slice(-1)[0])) {
            list.scrollTop = list.scrollHeight;
        }
    }, [messageLength])

    return scrollRef;
}
