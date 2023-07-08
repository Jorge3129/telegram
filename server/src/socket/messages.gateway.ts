import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { ChatUserRepository } from 'src/chat-users/services/chat-user.repository';
import { UserService } from 'src/users/user.service';
import { Server, Socket } from 'socket.io';
import { CatchError } from './decorators/catch-error.decorator';
import { SocketAuthGuard, SocketWithUser } from './guards/socket-auth.guard';
import { UseGuards } from '@nestjs/common';
import { SocketAuthService } from './services/socket-auth.service';

@WebSocketGateway(8000, { cors: true })
export class MessagesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  public readonly server: Server;

  constructor(
    private userService: UserService,
    private chatUserRepo: ChatUserRepository,
    private socketAuthService: SocketAuthService,
  ) {}

  @CatchError()
  public async handleConnection(socket: Socket) {
    const user = await this.socketAuthService.getUserFromSocket(socket);

    await this.userService.setUserSocketId(user.id, socket.id);
    await this.notifyUserContactsOnConnectionChange(user.id, true);

    console.log('CONNECTED ' + user.username);
  }

  @CatchError()
  @UseGuards(SocketAuthGuard)
  public async handleDisconnect(socket: SocketWithUser) {
    const user = await this.socketAuthService.getUserFromSocket(socket);

    await this.notifyUserContactsOnConnectionChange(user.id, false);
    await this.userService.setUserSocketId(user.id, null);
    console.log(`disconnected user ${user.username} successfully`);
  }

  public emitEventTo(
    targetSocketId: string,
    eventName: string,
    ...args: any[]
  ) {
    this.server.to(targetSocketId).emit(eventName, ...args);
  }

  private async notifyUserContactsOnConnectionChange(
    userId: number,
    online: boolean,
  ) {
    const socketIds = await this.chatUserRepo.findAllUserContactSockets(userId);

    socketIds.forEach(({ socketId, chatId }) => {
      this.emitEventTo(socketId, 'online-change', {
        online: online,
        chatId: chatId,
      });
    });
  }

  public async sendMessageToRecipients<T>(
    chatId: number,
    userId: number,
    eventName: string,
    data: T,
  ) {
    const members = await this.chatUserRepo.findChatRecipientSockets(
      chatId,
      userId,
    );

    members.forEach(({ socketId }) => {
      this.emitEventTo(socketId, eventName, data);
    });
  }
}
