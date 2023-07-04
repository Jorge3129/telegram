import { Socket } from 'socket.io';
import { messagesRepo } from '../messages/message.repository';
import { userService } from '../users/user.service';
import { User } from '../users/user.type';
import { Message } from '../messages/models/message.type';
import { SocketEventHandler } from './decorators/socket-handler.decorator';
import { userRepository } from '../users/user.repository';
import { chatUserRepository } from '../chat-users/chat-user.repository';
import { MessageService } from '../messages/message.service';

export class SocketsController {
  constructor(
    private readonly socket: Socket,
    private readonly user: User,
    private readonly messageService: MessageService,
  ) {}

  @SocketEventHandler()
  public async onMessage(data: { message: Message }): Promise<Message | null> {
    const { message } = data;

    const messageResponse = await this.messageService.create(
      message,
      this.user,
    );

    const members = await chatUserRepository.findChatRecipientSockets(
      message.chatId,
      message.authorId,
    );

    members.forEach(async ({ socketId }) => {
      this.emitEventTo(socketId, 'message-to-client', messageResponse);
    });

    return messageResponse;
  }

  @SocketEventHandler()
  public async onRead(data: {
    message: Message;
    username: string;
    userId: string;
  }) {
    const { message, userId, username } = data;

    await chatUserRepository.updateLastRead(
      parseInt(userId),
      message.chatId,
      message.timestamp,
    );
    await messagesRepo.updateSeen(parseInt(userId), message);

    const authorSocketId = await userService.getUserSocketId(message.authorId);

    if (!authorSocketId) {
      return;
    }

    this.emitEventTo(authorSocketId, 'seen', { message, userId, username });
  }

  @SocketEventHandler()
  public async onDisconnect(reason: any) {
    await userRepository.update(
      { id: this.user.id },
      {
        socketId: null as any,
      },
    );

    await this.notifyContactsOnConnectionChange(false);
  }

  public async notifyContactsOnConnectionChange(online: boolean) {
    const socketIds = await chatUserRepository.findAllUserContactSockets(
      this.user.id,
    );

    socketIds.forEach(({ socketId, chatId }) => {
      this.emitEventTo(socketId, 'online-change', {
        online: online,
        chatId: chatId,
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
