import {
  MessageBody,
  WebSocketGateway,
  SubscribeMessage,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { ChatUserRepository } from 'src/chat-users/chat-user.repository';
import { MessageService } from 'src/messages/message.service';
import { Message } from 'src/messages/models/message.type';
import { UserRepository } from 'src/users/user.repository';
import { UserService } from 'src/users/user.service';
import { Socket } from 'socket.io';
import { CatchError } from './decorators/catch-error.decorator';
import { UserEntity } from 'src/users/entity/user.entity';

@WebSocketGateway(8000, { cors: true })
export class MessagesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly messageService: MessageService,
    private readonly userRepo: UserRepository,
    private readonly userService: UserService,
    private readonly chatUserRepo: ChatUserRepository,
  ) {}

  @CatchError()
  public async handleConnection(socket: Socket) {
    const userId = parseInt((socket.handshake.query.userId as string) || '');

    const user = await this.userRepo.findOneBy({ id: userId });

    if (!user) {
      throw new Error(`No user with id ${userId}`);
    }

    console.log('CONNECTED ' + user.username);

    await this.userService.setUserSocketId(user.id, socket.id);
    await this.notifyUserContactsOnConnectionChange(user.id, true, socket);
  }

  @CatchError()
  public async handleDisconnect(socket: Socket) {
    const user = await this.getUser(socket.id);

    if (!user) {
      return;
    }

    await this.notifyUserContactsOnConnectionChange(user.id, false, socket);
    await this.userService.setUserSocketId(user.id, null);
  }

  private getUser(socketId: string): Promise<UserEntity | null> {
    return this.userRepo.findOneBy({ socketId });
  }

  @SubscribeMessage('message')
  public async onMessage(
    @MessageBody() data: { message: Message },
    @ConnectedSocket() socket: Socket,
  ): Promise<Message | null> {
    const { message } = data;

    const user = await this.getUser(socket.id);

    if (!user) {
      return null;
    }

    const messageResponse = await this.messageService.create(message, user);

    await this.sendMessageToRecipients(message, socket);

    return messageResponse;
  }

  @SubscribeMessage('read')
  public async onRead(
    @MessageBody() data: { message: Message; userId: string },
    @ConnectedSocket() socket: Socket,
  ) {
    const { message, userId } = data;

    await this.chatUserRepo.updateLastRead(
      parseInt(userId),
      message.chatId,
      message.timestamp,
    );
    await this.messageService.updateSeen(parseInt(userId), message);

    const authorSocketId = await this.userService.getUserSocketId(
      message.authorId,
    );

    if (!authorSocketId) {
      return;
    }

    this.emitEventTo(socket, authorSocketId, 'seen', {
      message,
      userId,
    });
  }

  private async notifyUserContactsOnConnectionChange(
    userId: number,
    online: boolean,
    currentSocket: Socket,
  ) {
    const socketIds = await this.chatUserRepo.findAllUserContactSockets(userId);

    socketIds.forEach(({ socketId, chatId }) => {
      this.emitEventTo(currentSocket, socketId, 'online-change', {
        online: online,
        chatId: chatId,
      });
    });
  }

  private async sendMessageToRecipients(message: Message, socket: Socket) {
    const members = await this.chatUserRepo.findChatRecipientSockets(
      message.chatId,
      message.authorId,
    );

    members.forEach(async ({ socketId }) => {
      this.emitEventTo(socket, socketId, 'message-to-client', message);
    });
  }

  public emitEventTo(
    currentSocket: Socket,
    targetSocketId: string,
    eventName: string,
    ...args: any[]
  ) {
    currentSocket.to(targetSocketId).emit(eventName, ...args);
  }
}
