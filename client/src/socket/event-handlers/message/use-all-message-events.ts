import { Socket } from "socket.io-client";
import { useDeleteMessageEvent } from "./use-delete-message-event";
import { useEditMessageEvent } from "./use-edit-message-event";
import { useNewMessageEvent } from "./use-new-message-event";
import { useSeenMessageEvent } from "./use-seen-message-event";

export const useAllMessageEvents = (socket: Socket | null) => {
  useNewMessageEvent(socket);
  useEditMessageEvent(socket);
  useDeleteMessageEvent(socket);
  useSeenMessageEvent(socket);
};
