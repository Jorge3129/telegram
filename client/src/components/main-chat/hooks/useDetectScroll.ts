import { MutableRefObject, UIEvent, useRef } from "react";
import { getVisibleHeight } from "./scrollUtils";
import { selectChats, setUnread } from "../../chat-sidebar/chats.reducer";
import { useSelector } from "react-redux";
import { IMessage } from "../../../types/types";
import { useAppDispatch } from "../../../redux/store";
import { Socket } from "socket.io-client";
import { selectMainChat } from "../reducers/main.chat.reducer";
import { alreadySeen, getMsgById } from "../../../utils/general.utils";
import { selectUser } from "../../../redux/user-reducer";

export const useDetectScroll = (
  socket: Socket | null,
  scrollRef: MutableRefObject<HTMLUListElement | null>,
  messages: IMessage[]
) => {
  const { chats } = useSelector(selectChats);
  const { chatId, mainChat } = useSelector(selectMainChat);
  const dispatch = useAppDispatch();
  const readRef = useRef<string[]>([]);
  const topRef = useRef<number>(scrollRef.current?.scrollTop || 0);

  const { user } = useSelector(selectUser);

  const getVisibleMessageIds = (): string[] => {
    const divs = Array.from(document.querySelectorAll(".message_list_item"));

    const visible = divs
      .filter((el, i) => {
        const seen = getVisibleHeight(el, scrollRef.current);
        return seen > 0 && seen === el.clientHeight;
      })
      .map((el) => el.id.replace(/message-/, ""));

    return visible;
  };

  const getLastVisibleMessage = (): string | undefined =>
    [...getVisibleMessageIds()].pop();

  const emitReadEvent = (searchedId: string) => {
    const msgRead = messages.find((msg) => msg.id === searchedId);

    if (!msgRead) {
      return;
    }

    //console.log('read event' + msgRead.messageId)
    const ind = messages.indexOf(msgRead);
    //console.log('setUnread scroll')
    dispatch(
      setUnread({
        unread: messages.slice(ind + 1).length,
        chatId: chatId || -1,
      })
    );

    if (!socket || !user) {
      return;
    }

    socket.emit("read", {
      message: msgRead,
      userId: user.id,
    });
  };

  const onMessagesFirstRendered = () => {
    //console.log('onFirstRendered')
    const last = getLastVisibleMessage();

    if (!mainChat || !last) {
      return;
    }

    const msg = getMsgById(last, chatId || 0, messages);

    if (!msg) return;
    if (!alreadySeen(msg.timestamp, mainChat?.unread, messages)) {
      //console.log('read this')
      emitReadEvent(last);
    }
  };

  const handleScroll = (e: UIEvent<HTMLUListElement>) => {
    //console.log('handleScroll')
    const unr = chats.find((ch) => ch.id === chatId)?.unread;
    if (!unr) return;

    if (
      !scrollRef.current?.scrollTop ||
      topRef.current > scrollRef.current?.scrollTop
    ) {
      topRef.current = scrollRef.current?.scrollTop || 0;
      return;
    }

    topRef.current = scrollRef.current?.scrollTop || 0;

    const last = getLastVisibleMessage();

    if (last && last !== [...readRef.current].pop()) {
      readRef.current.push(last);
      emitReadEvent(last);
    }
  };

  return { onMessagesFirstRendered, handleScroll };
};
