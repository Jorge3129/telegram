import { Module } from '@nestjs/common';
import { MessagesGateway } from './messages.gateway';
import { UserModule } from 'src/users/user.module';
import { ChatUsersModule } from 'src/chat-users/chat-users.module';
import { AuthModule } from 'src/auth/auth.module';
import { SocketAuthService } from './services/socket-auth.service';
import { MessageEventPublisher } from './services/message-event.publisher';
import { MessageAppEventHandler } from './services/message-app-event-handler';

@Module({
  imports: [UserModule, ChatUsersModule, AuthModule],
  providers: [
    MessagesGateway,
    SocketAuthService,
    MessageEventPublisher,
    MessageAppEventHandler,
  ],
})
export class SocketModule {}
