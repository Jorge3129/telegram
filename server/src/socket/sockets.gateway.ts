import { Injectable } from '@nestjs/common';
import { MessageService } from '../messages/message.service';
import { UserRepository } from '../users/user.repository';
import { SocketsController } from './sockets.controller';
import { Socket } from 'socket.io';
import { UserService } from 'src/users/user.service';
import { MessagesRepository } from 'src/messages/message.repository';
import { ChatUserRepository } from 'src/chat-users/chat-user.repository';

@Injectable()
export class SocketsGateway {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly userService: UserService,
    private readonly messageService: MessageService,
    private readonly messageRepo: MessagesRepository,
    private readonly chatUserRepo: ChatUserRepository,
  ) {}

  public async onConnect(socket: Socket): Promise<void> {
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

    const controller = new SocketsController(
      socket,
      user,
      this.messageService,
      this.messageRepo,
      this.userRepo,
      this.userService,
      this.chatUserRepo,
    );

    await controller.notifyContactsOnConnectionChange(true);

    socket.on('message', controller.onMessage);
    socket.on('read', controller.onRead);
    socket.on('disconnect', controller.onDisconnect);
  }
}
