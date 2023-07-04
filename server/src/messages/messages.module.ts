import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from './entity/message.entity';
import { MessageContentEntity } from './entity/message-content.entity';
import { MessageReadEntity } from './entity/message-read.entity';
import { MessagesRepository } from './message.repository';
import { MessageService } from './message.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MessageEntity,
      MessageContentEntity,
      MessageReadEntity,
    ]),
  ],
  providers: [MessagesRepository, MessageService],
})
export class MessagesModule {}
