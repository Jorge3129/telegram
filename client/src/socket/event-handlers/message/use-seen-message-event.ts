import { useCallback } from "react";
import { Socket } from "socket.io-client";
import { ChatActions } from "../../../chats/chats.reducer";
import { MessageActions } from "../../../messages/messages.reducer";
import { Message } from "../../../messages/models/message.model";
import { useAppDispatch } from "../../../redux/store";
import { useSocketEvent } from "../../use-socket-event";
import { useSelector } from "react-redux";
import { selectCurrentChat } from "../../../current-chat/reducers/current-chat.reducer";

export const useSeenMessageEvent = (socket: Socket | null) => {
  const dispatch = useAppDispatch();
  const { currentChatId } = useSelector(selectCurrentChat);

  const onSeen = useCallback(
    ({ message, userId }: { message: Message; userId: number }) => {
      if (currentChatId === message.chatId) {
        dispatch(MessageActions.setSeenMessage({ message, userId }));
      }
      dispatch(ChatActions.setSeenLastMessage({ message }));
    },
    [currentChatId, dispatch]
  );

  useSocketEvent(socket, "seen", onSeen);
};
