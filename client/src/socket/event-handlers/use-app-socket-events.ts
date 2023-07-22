import { Socket } from "socket.io-client";
import { useOnlineChangeEvent } from "./online-status/use-online-change-event";
import { useMessageSocketEvents } from "./message/use-message-socket-events";
import { useVotesSocketEvents } from "./vote/use-vote-socket-events";

export const useAppSocketEvents = (socket: Socket | null) => {
  useOnlineChangeEvent(socket);
  useMessageSocketEvents(socket);
  useVotesSocketEvents(socket);
};
