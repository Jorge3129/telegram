import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from './entity/message.entity';
import { MessageContentEntity } from './entity/message-content.entity';
import { MessageReadEntity } from './entity/message-read.entity';
import { MessagesRepository } from './message.repository';
import { MessageService } from './message.service';
import { ChatUsersModule } from 'src/chat-users/chat-users.module';
import { UserModule } from 'src/users/user.module';
import { CreateMessageService } from './create-message.service';
import { MessagesController } from './messages.controller';
import { SocketModule } from 'src/socket/socket.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MessageEntity,
      MessageContentEntity,
      MessageReadEntity,
    ]),
    ChatUsersModule,
    UserModule,
    SocketModule,
  ],
  providers: [MessagesRepository, MessageService, CreateMessageService],
  exports: [MessageService, MessagesRepository],
  controllers: [MessagesController],
})
export class MessagesModule {}
