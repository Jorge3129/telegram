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
import { UserService } from 'src/users/user.service';
import { Socket } from 'socket.io';
import { CatchError } from './decorators/catch-error.decorator';
import { CreateMessageDto } from 'src/messages/dto/create-message.dto';
import { SocketAuthGuard, SocketWithUser } from './guards/socket-auth.guard';
import { UseGuards } from '@nestjs/common';
import { SocketAuthService } from './services/socket-auth.service';

@WebSocketGateway(8000, { cors: true })
export class MessagesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private messageService: MessageService,
    private userService: UserService,
    private chatUserRepo: ChatUserRepository,
    private socketAuthService: SocketAuthService,
  ) {}

  @CatchError()
  public async handleConnection(socket: Socket) {
    const user = await this.socketAuthService.getUserFromSocket(socket);

    await this.userService.setUserSocketId(user.id, socket.id);
    await this.notifyUserContactsOnConnectionChange(user.id, true, socket);

    console.log('CONNECTED ' + user.username);
  }

  @CatchError()
  @UseGuards(SocketAuthGuard)
  public async handleDisconnect(socket: SocketWithUser) {
    const user = await this.socketAuthService.getUserFromSocket(socket);

    await this.notifyUserContactsOnConnectionChange(user.id, false, socket);
    await this.userService.setUserSocketId(user.id, null);
    console.log(`disconnected user ${user.username} successfully`);
  }

  @SubscribeMessage('message')
  @UseGuards(SocketAuthGuard)
  public async onMessage(
    @MessageBody() data: { message: CreateMessageDto },
    @ConnectedSocket() socket: SocketWithUser,
  ): Promise<Message | null> {
    const user = socket.user;

    const { message: messageDto } = data;

    const messageResponse = await this.messageService.create(messageDto, user);

    await this.sendMessageToRecipients(messageResponse, socket);

    return messageResponse;
  }

  @SubscribeMessage('read')
  @UseGuards(SocketAuthGuard)
  public async onRead(
    @MessageBody() data: { message: Message },
    @ConnectedSocket() socket: SocketWithUser,
  ) {
    const user = socket.user;

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

    members.forEach(({ socketId }) => {
      this.emitEventTo(socket, socketId, 'message-to-client', message);
    });
  }
}
