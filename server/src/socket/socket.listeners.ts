import { Socket } from "socket.io";
import { User } from "../users/user.type";
import { userService } from "../users/user.service";
import { chatsRepo } from "../chats/chats.repository";
import { chatsService } from "../chats/chats.service";
import { messagesRepo } from "../messages/message.repository";

export const onMessage =
  (socket: Socket, user: User | null) => async (data: any) => {
    const { message } = data;

    const savedMessage = await messagesRepo.save(message);

    await chatsService.updateLastRead(user?.username || "", message);

    const chat = await chatsRepo.findOne((ch) => ch.id === message.chatId);

    if (!chat) {
      return;
    }

    chat.members.forEach((member) => {
      emitEvent(socket, member.username, "message-to-client", message);
    });
  };

export const onRead = (socket: Socket) => async (data: any) => {
  const { message, username } = data;
  await chatsService.updateLastRead(username, message);

  await messagesRepo.updateSeen(username, message);

  emitEvent(socket, message.author, "seen", { message, username });
};

export const onDisconnect =
  (socket: Socket, user: User | null) => async (reason: any) => {
    if (user) {
      user.online = false;
      user.socketId = undefined;

      const contacts = await userService.findUserContacts(user);

      contacts.forEach(({ username, chatId }) => {
        emitEvent(socket, username, "online-change", { online: false, chatId });
      });
    }
  };

export const emitEvent = (
  socket: Socket,
  username: string | undefined,
  id: string,
  args: any
) => {
  userService.getUserSocketId(username || "").then((socketId) => {
    socket.to(socketId).emit(id, args);
  });
};
