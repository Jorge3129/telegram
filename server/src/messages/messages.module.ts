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

@Module({
  imports: [
    TypeOrmModule.forFeature([MessageEntity]),
    ChatUsersModule,
    UserModule,
    PollsModule,
  ],
  providers: [
    MessageService,
    ...MessageMapperModule.providers,
    ...MessageQueriesModule.providers,
    ...MessageMutationsModule.providers,
  ],
  exports: [
    ...MessageQueriesModule.providers,
    ...MessageMutationsModule.providers,
  ],
  controllers: [MessagesController],
})
export class MessagesModule {}
