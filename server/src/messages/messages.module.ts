import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from './entity/message.entity';
import {
  MessageContentEntity,
  TextMessageContentEntity,
} from './entity/message-content.entity';
import { MessageReadEntity } from './entity/message-read.entity';
import { MessagesRepository } from './services/message.repository';
import { MessageService } from './message.service';
import { ChatUsersModule } from 'src/chat-users/chat-users.module';
import { UserModule } from 'src/users/user.module';
import { CreateMessageService } from './services/create-message.service';
import { MessagesController } from './messages.controller';
import { MessageReadsService } from './services/message-reads.service';
import { EditMessageService } from './services/edit-message.service';
import { MessageModelMapper } from './services/mappers/message-model.mapper';
import { MessageMappingHelper } from './services/mappers/message-mapping.helper';
import { TextMessageBuilder } from './services/mappers/builders/text-message-builder';
import { GifMessageBuilder } from './services/mappers/builders/gif-message.builder';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MessageEntity,
      MessageContentEntity,
      TextMessageContentEntity,
      MessageReadEntity,
    ]),
    ChatUsersModule,
    UserModule,
  ],
  providers: [
    MessagesRepository,
    MessageService,
    CreateMessageService,
    MessageReadsService,
    EditMessageService,
    MessageModelMapper,
    TextMessageBuilder,
    MessageMappingHelper,
    GifMessageBuilder,
  ],
  exports: [MessageService, MessagesRepository, MessageReadsService],
  controllers: [MessagesController],
})
export class MessagesModule {}
