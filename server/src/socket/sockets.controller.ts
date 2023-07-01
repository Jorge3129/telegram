import { Socket } from "socket.io";
import { chatsRepo } from "../chats/chats.repository";
import { chatsService } from "../chats/chats.service";
import { messagesRepo } from "../messages/message.repository";
import { userService } from "../users/user.service";
import { User } from "../users/user.type";
import { Message } from "../messages/models/message.type";
import { SocketEventHandler } from "./decorators/socket-handler.decorator";
import { userRepository } from "../users/user.repository";

export class SocketsController {
  constructor(private readonly socket: Socket, private readonly user: User) {}

  @SocketEventHandler()
  public async onMessage(data: any): Promise<Message | null> {
    const { message } = data;

    const savedMessage = await messagesRepo.save(message);

    await chatsService.updateLastRead(this.user.id, message);

    const chat = await chatsRepo.findOne((ch) => ch.id === message.chatId);

    if (!chat) {
      return null;
    }

    chat.members.forEach(async (member) => {
      const memberSocketId = await userService.getUserSocketId(member.userId);

      if (!memberSocketId) {
        return;
      }

      this.emitEventTo(memberSocketId, "message-to-client", message);
    });

    return savedMessage;
  }

  @SocketEventHandler()
  public async onRead(data: {
    message: Message;
    username: string;
    userId: string;
  }) {
    const { message, userId, username } = data;

    await chatsService.updateLastRead(parseInt(userId), message);
    await messagesRepo.updateSeen(parseInt(userId), message);

    const authorSocketId = await userService.getUserSocketId(message.authorId);

    if (!authorSocketId) {
      return;
    }

    this.emitEventTo(authorSocketId, "seen", { message, userId, username });
  }

  @SocketEventHandler()
  public async onDisconnect(reason: any) {
    await userRepository.update(
      { id: this.user.id },
      {
        online: false,
        socketId: undefined,
      }
    );

    await this.notifyContactsOnConnectionChange(false);
  }

  public async notifyContactsOnConnectionChange(online: boolean) {
    const contacts = await userService.findUserContacts(this.user.id);

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
    this.socket.to(targetSocketId).emit(eventName, ...args);
  }
}
