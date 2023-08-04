import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { SocketAuthService } from './services/socket-auth.service';
import { SocketMessageAppEventHandler } from './notifications/messages/socket.message-app-event.handler';
import { MessageNotificationPublisher } from './notifications/messages/message-notification.publisher';
import { SocketVotesAppEventHandler } from './notifications/votes/socket.votes-app-event.handler';
import { VotesNotificationPublisher } from './notifications/votes/votes-notification.publisher';
import { AuthModule } from '../auth/auth.module';
import { ChatUsersModule } from '../chat-users/chat-users.module';
import { PollsModule } from '../polls/polls.module';
import { UserModule } from '../users/user.module';
import { MessagesModule } from '../messages/messages.module';

@Module({
  imports: [
    UserModule,
    MessagesModule,
    ChatUsersModule,
    AuthModule,
    PollsModule,
  ],
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
