import { userRepository } from "../users/user.repository";
import { SocketsController } from "./sockets.controller";
import { Socket } from "socket.io";

export class SocketsGateway {
  public async onConnect(socket: Socket): Promise<void> {
    const userId = parseInt((socket.handshake.query.userId as string) || "");

    const user = await userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new Error(`No user with id ${userId}`);
    }

    console.log("CONNECTED " + user.username);

    await userRepository.update(
      { id: user.id },
      {
        socketId: socket.id,
      }
    );

    const controller = new SocketsController(socket, user);

    await controller.notifyContactsOnConnectionChange(true);

    socket.on("message", controller.onMessage);
    socket.on("read", controller.onRead);
    socket.on("disconnect", controller.onDisconnect);
  }
}

export const socketsGateway = new SocketsGateway();
