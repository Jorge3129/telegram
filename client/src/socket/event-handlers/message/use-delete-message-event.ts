import { useCallback } from "react";
import { MessageActions } from "../../../messages/messages.reducer";
import { useSocketEvent } from "../../use-socket-event";
import { Socket } from "socket.io-client";
import { useAppDispatch } from "../../../redux/store";

export const useDeleteMessageEvent = (socket: Socket | null) => {
  const dispatch = useAppDispatch();

  const onDeleted = useCallback(
    (messageId: string) => {
      dispatch(MessageActions.deleteMessage(messageId));
    },
    [dispatch]
  );

  useSocketEvent(socket, "message-deleted", onDeleted);
};
