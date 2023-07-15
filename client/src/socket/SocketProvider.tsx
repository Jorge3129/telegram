import { FC, PropsWithChildren, useEffect, useState } from "react";
import { SocketContext } from "./socket.context";
import { Socket, io } from "socket.io-client";
import { tokenService } from "../auth/services/token.service";
import environment from "../environment/environment";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/user-reducer";
import { useAllAppEvents } from "./event-handlers/use-all-app-events";

export const SocketProvider: FC<PropsWithChildren> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { user } = useSelector(selectUser);

  useEffect(() => {
    if (!user) {
      return;
    }

    const newSocket = io(`${environment.wsUrl}`, {
      extraHeaders: {
        authorization: tokenService.getBearer(),
      },
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [user]);

  useAllAppEvents(socket);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
