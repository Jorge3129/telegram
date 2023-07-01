import { userRepository } from "../users/user.repository";
import { SocketsController } from "./sockets.controller";
import { Socket } from "socket.io";

export class SocketsGateway {
  public async onConnect(socket: Socket): Promise<void> {
    const username = socket.handshake.query.username;

    console.log("CONNECTED " + username);

    const user = await userRepository.findOne(
      (u) => u.username === socket.handshake.query.username
    );

    if (!user) {
      throw new Error(`No user with name ${username}`);
    }

    await userRepository.update(
      { id: user.id },
      {
        online: true,
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
