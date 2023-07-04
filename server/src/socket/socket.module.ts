import { Module } from '@nestjs/common';
import { MessagesModule } from 'src/messages/messages.module';
import { MessagesGateway } from './messages.gateway';
import { UserModule } from 'src/users/user.module';
import { ChatUsersModule } from 'src/chat-users/chat-users.module';

@Module({
  imports: [MessagesModule, UserModule, ChatUsersModule],
  providers: [MessagesGateway],
})
export class SocketModule {}
