import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesModule } from './messages/messages.module';
import { ChatUsersModule } from './chat-users/chat-users.module';
import { ChatsModule } from './chats/chats.module';
import { AuthModule } from './auth/auth.module';
import ormConfig from './config/orm-config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { SocketModule } from './socket/socket.module';
import { UploadsModule } from './uploads/uploads.module';
import { SharedModule } from './shared/shared.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EventEmitterModule.forRoot({
      wildcard: true,
      delimiter: '.',
    }),
    TypeOrmModule.forRoot(ormConfig),
    UserModule,
    MessagesModule,
    ChatUsersModule,
    ChatsModule,
    AuthModule,
    SocketModule,
    UploadsModule,
    SharedModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
