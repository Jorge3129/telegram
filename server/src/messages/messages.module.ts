import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from './entity/message.entity';
import { MessageService } from './message.service';
import { ChatUsersModule } from 'src/chat-users/chat-users.module';
import { UserModule } from 'src/users/user.module';
import { MessagesController } from './messages.controller';
import { MessageMapperModule } from './mappers/message-mapper.module';

import { MessageQueriesModule } from './queries/message-queries.module';
import { MessageMutationsModule } from './mutations/message-mutations.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MessageEntity]),
    ChatUsersModule,
    UserModule,
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
