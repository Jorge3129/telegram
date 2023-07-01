import { Socket } from "socket.io";
import { chatsRepo } from "../chats/chats.repository";
import { chatsService } from "../chats/chats.service";
import { messagesRepo } from "../messages/message.repository";
import { userService } from "../users/user.service";
import { User } from "../users/user.type";
import { Message } from "../messages/models/message.type";
import { SocketEventHandler } from "./decorators/socket-handler.decorator";

export class SocketsController {
  constructor(private readonly socket: Socket, private readonly user: User) {}

  @SocketEventHandler()
  public async onMessage(data: any): Promise<Message | null> {
    const { message } = data;

    const savedMessage = await messagesRepo.save(message);

    await chatsService.updateLastRead(this.user?.username || "", message);

    const chat = await chatsRepo.findOne((ch) => ch.id === message.chatId);

    if (!chat) {
      return null;
    }

    chat.members.forEach(async (member) => {
      const memberSocketId = await userService.getUserSocketId(member.username);

      if (!memberSocketId) {
        return;
      }

      this.emitEventTo(memberSocketId, "message-to-client", message);
    });

    return savedMessage;
  }

  @SocketEventHandler()
  public async onRead(data: { message: Message; username: string }) {
    const { message, username } = data;

    await chatsService.updateLastRead(username, message);
    await messagesRepo.updateSeen(username, message);

    const authorSocketId = await userService.getUserSocketId(message.author);

    if (!authorSocketId) {
      return;
    }

    this.emitEventTo(authorSocketId, "seen", { message, username });
  }

  @SocketEventHandler()
  public async onDisconnect(reason: any) {
    if (this.user) {
      this.user.online = false;
      this.user.socketId = undefined;

      await this.notifyContactsOnConnectionChange(false);
    }
  }

  public async notifyContactsOnConnectionChange(online: boolean) {
    const contacts = await userService.findUserContacts(this.user);

    contacts.forEach((contact) => {
      if (!contact.user.socketId) {
        return;
      }

      this.emitEventTo(contact.user.socketId, "online-change", {
        online: online,
        chatId: contact.chatId,
      });
    });
  }

  public emitEventTo(
    targetSocketId: string,
    eventName: string,
    ...args: any[]
  ) {
    this.socket.to(targetSocketId).emit(eventName, args);
  }
}
