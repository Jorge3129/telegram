import { useCallback } from "react";
import { Socket } from "socket.io-client";
import { ChatActions } from "../../../chats/chats.reducer";
import { MessageActions } from "../../../messages/state/messages.reducer";
import { useAppDispatch } from "../../../redux/store";
import { useSocketEvent } from "../../use-socket-event";
import { useSelector } from "react-redux";
import { selectCurrentChat } from "../../../current-chat/reducers/current-chat.reducer";
import {
  MessageSocketEvents,
  SeenMessageSocketPayload,
} from "../../dtos/message-socket-events";

export const useSeenMessageEvent = (socket: Socket | null) => {
  const dispatch = useAppDispatch();
  const { currentChatId } = useSelector(selectCurrentChat);

  const onSeen = useCallback(
    ({ message, userId }: SeenMessageSocketPayload) => {
      if (currentChatId === message.chatId) {
        dispatch(MessageActions.setSeenMessage({ message, userId }));
      }
      dispatch(ChatActions.setSeenLastMessage({ message }));
    },
    [currentChatId, dispatch]
  );

  useSocketEvent(socket, MessageSocketEvents.READ, onSeen);
};
