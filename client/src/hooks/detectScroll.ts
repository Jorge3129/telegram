import {MutableRefObject, UIEvent} from "react";
import {getVisibleHeight} from "../components/chat/scrollUtils";
import {selectChats, setUnread} from "../redux/chats.reducer";
import {useSelector} from "react-redux";
import {IChat, IMessage} from "../types/types";
import {useAppDispatch} from "../redux/store";

export const useDetectScroll =

    (
        topRef: MutableRefObject<number>,
        scrollRef: MutableRefObject<HTMLUListElement | null>,
        ref: MutableRefObject<number[]>,
        chat: IChat,
        messages: IMessage[]
    ) => {

        const {chats, loading} = useSelector(selectChats);
        const dispatch = useAppDispatch();

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
            if (last && last !== [...ref.current].pop()) {
                //console.log(last)
                ref.current.push(last);
                const msgRead = messages.find(msg => msg.messageId === last)
                if (msgRead) {
                    const ind = messages.indexOf(msgRead);
                    dispatch(setUnread({unread: messages.slice(ind + 1).length, chatId: chat.id}))
                }
            }
        };
    }

