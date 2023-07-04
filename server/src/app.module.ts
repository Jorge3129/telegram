import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesModule } from './messages/messages.module';
import { ChatUsersModule } from './chat-users/chat-users.module';
import ormConfig from './config/orm-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(ormConfig),
    UserModule,
    MessagesModule,
    ChatUsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
