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
import { AuthTokenService } from 'src/auth/auth-token.service';
import { CreateMessageDto } from 'src/messages/dto/create-message.dto';

@WebSocketGateway(8000, { cors: true })
export class MessagesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private messageService: MessageService,
    private userRepo: UserRepository,
    private userService: UserService,
    private chatUserRepo: ChatUserRepository,
    private authTokenService: AuthTokenService,
  ) {}

  @CatchError()
  public async handleConnection(socket: Socket) {
    const user = await this.getUserFromSocket(socket);

    if (!user) {
      throw new Error(`No user`);
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
    @MessageBody() data: { message: CreateMessageDto },
    @ConnectedSocket() socket: Socket,
  ): Promise<Message | null> {
    const user = await this.getUserFromSocket(socket);

    if (!user) {
      return null;
    }

    const { message: messageDto } = data;

    const messageResponse = await this.messageService.create(messageDto, user);

    await this.sendMessageToRecipients(messageResponse, socket);

    return messageResponse;
  }

  @SubscribeMessage('read')
  public async onRead(
    @MessageBody() data: { message: Message },
    @ConnectedSocket() socket: Socket,
  ) {
    const user = await this.getUserFromSocket(socket);

    if (!user) {
      return;
    }

    const { message } = data;

    await this.messageService.updateSeenStatus(user.id, message);

    const authorSocketId = await this.userService.getUserSocketId(
      message.authorId,
    );

    if (!authorSocketId) {
      return;
    }

    this.emitEventTo(socket, authorSocketId, 'seen', {
      message,
      userId: user.id,
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

  private async getUserFromSocket(socket: Socket): Promise<UserEntity | null> {
    try {
      const authHeader = socket.handshake.headers.authorization ?? '';

      return await this.authTokenService.getUserFromAuthHeader(authHeader);
    } catch (e) {
      socket.disconnect();

      return null;
    }
  }
}
