import { useCallback } from "react";
import { ChatActions } from "../../../chats/chats.reducer";
import { useSocketEvent } from "../../use-socket-event";
import { Socket } from "socket.io-client";
import { useAppDispatch } from "../../../redux/store";

export const useOnlineChangeEvent = (socket: Socket | null) => {
  const dispatch = useAppDispatch();

  const onOnlineChange = useCallback(
    ({ online, chatId }: { online: boolean; chatId: number }) => {
      dispatch(ChatActions.setOnline({ online, chatId }));
    },
    [dispatch]
  );

  useSocketEvent(socket, "online-change", onOnlineChange);
};
