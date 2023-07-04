import {
  MessageBody,
  WebSocketGateway,
  SubscribeMessage,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { ChatUserRepository } from 'src/chat-users/chat-user.repository';
import { MessagesRepository } from 'src/messages/message.repository';
import { MessageService } from 'src/messages/message.service';
import { Message } from 'src/messages/models/message.type';
import { UserRepository } from 'src/users/user.repository';
import { UserService } from 'src/users/user.service';
import { Socket } from 'socket.io';

@WebSocketGateway(8000, { cors: true })
export class MessagesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly messageService: MessageService,
    private readonly messageRepo: MessagesRepository,
    private readonly userRepo: UserRepository,
    private readonly userService: UserService,
    private readonly chatUserRepo: ChatUserRepository,
  ) {}

  public async handleConnection(socket: Socket) {
    const userId = parseInt((socket.handshake.query.userId as string) || '');

    const user = await this.userRepo.findOneBy({ id: userId });

    if (!user) {
      throw new Error(`No user with id ${userId}`);
    }

    console.log('CONNECTED ' + user.username);

    await this.userRepo.update(
      { id: user.id },
      {
        socketId: socket.id,
      },
    );

    await this.notifyContactsOnConnectionChange(true, socket);
  }

  public async handleDisconnect(socket: Socket) {
    await this.notifyContactsOnConnectionChange(false, socket);

    await this.userRepo.update(
      { id: (await this.getUser(socket.id)).id },
      {
        socketId: null as any,
      },
    );
  }

  private getUser(socketId: string) {
    return this.userRepo.findOneByOrFail({ socketId });
  }

  @SubscribeMessage('message')
  public async onMessage(
    @MessageBody() data: { message: Message },
    @ConnectedSocket() socket: Socket,
  ): Promise<Message | null> {
    const { message } = data;

    const messageResponse = await this.messageService.create(
      message,
      await this.getUser(socket.id),
    );

    const members = await this.chatUserRepo.findChatRecipientSockets(
      message.chatId,
      message.authorId,
    );

    members.forEach(async ({ socketId }) => {
      this.emitEventTo(socket, socketId, 'message-to-client', messageResponse);
    });

    return messageResponse;
  }

  @SubscribeMessage('read')
  public async onRead(
    @MessageBody() data: { message: Message; username: string; userId: string },
    @ConnectedSocket() socket: Socket,
  ) {
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

    this.emitEventTo(socket, authorSocketId, 'seen', {
      message,
      userId,
      username,
    });
  }

  public async notifyContactsOnConnectionChange(
    online: boolean,
    currentSocket: Socket,
  ) {
    const socketIds = await this.chatUserRepo.findAllUserContactSockets(
      (
        await this.getUser(currentSocket.id)
      ).id,
    );

    socketIds.forEach(({ socketId, chatId }) => {
      this.emitEventTo(currentSocket, socketId, 'online-change', {
        online: online,
        chatId: chatId,
      });
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
