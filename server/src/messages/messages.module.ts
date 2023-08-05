import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from './entity/message.entity';
import { MessageService } from './message.service';
import { MessagesController } from './messages.controller';
import { MessageMapperModule } from './mappers/message-mapper.module';

import { MessageQueriesModule } from './queries/message-queries.module';
import { MessageMutationsModule } from './mutations/message-mutations.module';
import { ChatUsersModule } from '../chat-users/chat-users.module';
import { PollsModule } from '../polls/polls.module';
import { UserModule } from '../users/user.module';
import { MessageReadsModule } from '../message-reads/message-reads.module';
import { CreateMessageRequirement } from './requirements/create-message.requirement';
import { DeleteMessageRequirement } from './requirements/delete-message.requirement';
import { MessageAuthorRequirement } from './requirements/message-author.requirement';
import { EdiMessageRequirement } from './requirements/edit-message.requirement';

@Module({
  imports: [
    TypeOrmModule.forFeature([MessageEntity]),
    ChatUsersModule,
    UserModule,
    PollsModule,
    MessageReadsModule,
  ],
  providers: [
    MessageService,
    CreateMessageRequirement,
    DeleteMessageRequirement,
    MessageAuthorRequirement,
    EdiMessageRequirement,
    ...MessageMapperModule.providers,
    ...MessageQueriesModule.providers,
    ...MessageMutationsModule.providers,
  ],
  exports: [
    ...MessageMapperModule.providers,
    ...MessageQueriesModule.providers,
    ...MessageMutationsModule.providers,
  ],
  controllers: [MessagesController],
})
export class MessagesModule {}
