import { useCallback } from "react";
import { ChatActions } from "../../../chats/chats.reducer";
import { useSocketEvent } from "../../use-socket-event";
import { Socket } from "socket.io-client";
import { useAppDispatch } from "../../../redux/store";
import {
  OnlineChangeSocketPayload,
  OnlineStatusSocketEvents,
} from "../../dtos/online-status-events";

export const useOnlineChangeEvent = (socket: Socket | null) => {
  const dispatch = useAppDispatch();

  const onOnlineChange = useCallback(
    ({ online, chatId }: OnlineChangeSocketPayload) => {
      dispatch(ChatActions.setOnline({ online, chatId }));
    },
    [dispatch]
  );

  useSocketEvent(socket, OnlineStatusSocketEvents.CHANGE, onOnlineChange);
};
