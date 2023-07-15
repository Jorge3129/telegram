import { createContext, useContext } from "react";
import { Socket } from "socket.io-client";

interface SocketContextData {
  socket: Socket | null;
}

export const SocketContext = createContext<SocketContextData>({
  socket: null,
});

export const useSocketContext = () => useContext(SocketContext);
