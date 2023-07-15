import { useEffect } from "react";
import { Socket } from "socket.io-client";

export const useSocketEvent = (
  socket: Socket | null,
  event: string,
  handler: (...args: any[]) => any
) => {
  useEffect(() => {
    if (socket) {
      socket.on(event, handler);
    }

    return () => {
      if (socket) {
        socket.off(event, handler);
      }
    };
  }, [socket, event, handler]);
};
