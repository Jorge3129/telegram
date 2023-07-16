import { useCallback } from "react";
import { Socket } from "socket.io-client";
import { ChatActions } from "../../../chats/chats.reducer";
import { MessageActions } from "../../../messages/messages.reducer";
import { useAppDispatch } from "../../../redux/store";
import { useSocketEvent } from "../../use-socket-event";
import {
  EditMessageSocketPayload,
  MessageSocketEvents,
} from "../../dtos/message-socket-events";

export const useEditMessageEvent = (socket: Socket | null) => {
  const dispatch = useAppDispatch();

  const onEdit = useCallback(
    (payload: EditMessageSocketPayload) => {
      dispatch(MessageActions.editMessage(payload));
      dispatch(ChatActions.editLastMessage(payload));
    },
    [dispatch]
  );

  useSocketEvent(socket, MessageSocketEvents.EDIT, onEdit);
};
