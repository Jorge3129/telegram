import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { UserModule } from 'src/users/user.module';
import { ChatUsersModule } from 'src/chat-users/chat-users.module';
import { AuthModule } from 'src/auth/auth.module';
import { SocketAuthService } from './services/socket-auth.service';
import { SocketMessageAppEventHandler } from './notifications/messages/socket.message-app-event.handler';
import { MessageNotificationPublisher } from './notifications/messages/message-notification.publisher';
import { SocketVotesAppEventHandler } from './notifications/votes/socket.votes-app-event.handler';
import { VotesNotificationPublisher } from './notifications/votes/votes-notification.publisher';
import { PollsModule } from 'src/polls/polls.module';

@Module({
  imports: [UserModule, ChatUsersModule, AuthModule, PollsModule],
  providers: [
    SocketGateway,
    SocketAuthService,
    MessageNotificationPublisher,
    SocketMessageAppEventHandler,
    VotesNotificationPublisher,
    SocketVotesAppEventHandler,
  ],
})
export class SocketModule {}
