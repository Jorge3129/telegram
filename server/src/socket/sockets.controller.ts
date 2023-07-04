import { Socket } from 'socket.io';
import { User } from '../users/user.type';
import { Message } from '../messages/models/message.type';
import { SocketEventHandler } from './decorators/socket-handler.decorator';
import { MessageService } from '../messages/message.service';
import { UserRepository } from 'src/users/user.repository';
import { UserService } from 'src/users/user.service';
import { MessagesRepository } from 'src/messages/message.repository';
import { ChatUserRepository } from 'src/chat-users/chat-user.repository';

export class SocketsController {
  constructor(
    private readonly socket: Socket,
    private readonly user: User,
    private readonly messageService: MessageService,
    private readonly messageRepo: MessagesRepository,
    private readonly userRepo: UserRepository,
    private readonly userService: UserService,
    private readonly chatUserRepo: ChatUserRepository,
  ) {}

  @SocketEventHandler()
  public async onMessage(data: { message: Message }): Promise<Message | null> {
    const { message } = data;

    const messageResponse = await this.messageService.create(
      message,
      this.user,
    );

    const members = await this.chatUserRepo.findChatRecipientSockets(
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

    await this.chatUserRepo.updateLastRead(
      parseInt(userId),
      message.chatId,
      message.timestamp,
    );
    await this.messageRepo.updateSeen(parseInt(userId), message);

    const authorSocketId = await this.userService.getUserSocketId(
      message.authorId,
    );

    if (!authorSocketId) {
      return;
    }

    this.emitEventTo(authorSocketId, 'seen', { message, userId, username });
  }

  @SocketEventHandler()
  public async onDisconnect() {
    await this.userRepo.update(
      { id: this.user.id },
      {
        socketId: null as any,
      },
    );

    await this.notifyContactsOnConnectionChange(false);
  }

  public async notifyContactsOnConnectionChange(online: boolean) {
    const socketIds = await this.chatUserRepo.findAllUserContactSockets(
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
