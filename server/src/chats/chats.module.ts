import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatEntity } from './entity/chat.entity';
import { ChatsController } from './chats.controller';
import { ChatsRepository } from './chats.repository';
import { ChatsService } from './chats.service';
import { ChatMappersModule } from './mappers/chat-mappers.module';
import { MessagesModule } from '../messages/messages.module';
import { ChatUsersModule } from '../chat-users/chat-users.module';
import { MessageReadsModule } from '../message-reads/message-reads.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatEntity]),
    MessagesModule,
    MessageReadsModule,
    ChatUsersModule,
  ],
  controllers: [ChatsController],
  providers: [...ChatMappersModule.providers, ChatsRepository, ChatsService],
})
export class ChatsModule {}
