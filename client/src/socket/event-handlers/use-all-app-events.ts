import { Socket } from "socket.io-client";
import { useOnlineChangeEvent } from "./online-status/use-online-change-event";
import { useAllMessageEvents } from "./message/use-all-message-events";

export const useAllAppEvents = (socket: Socket | null) => {
  useOnlineChangeEvent(socket);
  useAllMessageEvents(socket);
};
