import { Module } from '@nestjs/common';
import { MessagesGateway } from './messages.gateway';
import { UserModule } from 'src/users/user.module';
import { ChatUsersModule } from 'src/chat-users/chat-users.module';
import { AuthModule } from 'src/auth/auth.module';
import { SocketAuthService } from './services/socket-auth.service';

@Module({
  imports: [UserModule, ChatUsersModule, AuthModule],
  providers: [MessagesGateway, SocketAuthService],
  exports: [SocketAuthService, MessagesGateway],
})
export class SocketModule {}
