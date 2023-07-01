import { emitEvent, onDisconnect, onMessage, onRead } from "./socket.listeners";
import { User } from "../users/user.type";
import { userRepository } from "../users/user.repository";
import { userService } from "../users/user.service";

export const onConnect = async (socket: any) => {
  console.log("CONNECTED " + socket.handshake.query.username);

  const user = await userRepository.findOne(
    (u) => u.username === socket.handshake.query.username
  );
  if (user) {
    user.online = true;
    user.socketId = socket.id;

    const contacts = await userService.findUserContacts(user);

    contacts.forEach(({ username, chatId }) =>
      emitEvent(socket, username, "online-change", { online: true, chatId })
    );
  }

  socket.on("message", onMessage(socket, user));
  socket.on("read", onRead(socket));
  socket.on("disconnect", onDisconnect(socket, user));
};
