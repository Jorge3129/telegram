import { useCallback } from "react";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { ChatActions } from "../../../chats/chats.reducer";
import { selectCurrentChat } from "../../../current-chat/reducers/current-chat.reducer";
import { MessageActions } from "../../../messages/state/messages.reducer";
import { useAppDispatch } from "../../../redux/store";
import { useSocketEvent } from "../../use-socket-event";
import {
  MessageSocketEvents,
  NewMessageSocketPayload,
} from "../../dtos/message-socket-events";

export const useNewMessageEvent = (socket: Socket | null) => {
  const dispatch = useAppDispatch();
  const { currentChatId } = useSelector(selectCurrentChat);

  const onMessage = useCallback(
    ({ message }: NewMessageSocketPayload) => {
      if (currentChatId === message.chatId) {
        dispatch(MessageActions.addMessage(message));
      }

      dispatch(ChatActions.setLastMessage({ message, chatId: message.chatId }));
      dispatch(ChatActions.incrementUnread({ chatId: message.chatId }));
    },
    [currentChatId, dispatch]
  );

  useSocketEvent(socket, MessageSocketEvents.NEW, onMessage);
};
