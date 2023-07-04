import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatEntity } from './entity/chat.entity';
import { ChatsController } from './chats.controller';
import { ChatsRepository } from './chats.repository';
import { ChatsService } from './chats.service';
import { MessagesModule } from 'src/messages/messages.module';
import { ChatUsersModule } from 'src/chat-users/chat-users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatEntity]),
    MessagesModule,
    ChatUsersModule,
  ],
  controllers: [ChatsController],
  providers: [ChatsRepository, ChatsService],
})
export class ChatsModule {}
