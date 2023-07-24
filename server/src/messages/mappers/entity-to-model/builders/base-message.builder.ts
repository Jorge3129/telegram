import { Injectable } from '@nestjs/common';
import { MessageEntity } from 'src/messages/entity/message.entity';
import { BaseMessage } from 'src/messages/models/message.type';
import { MessageMappingHelper } from '../message-mapping.helper';
import { UserEntity } from 'src/users/entity/user.entity';

@Injectable()
export class BaseMessageBuilder {
  constructor(private messageHelper: MessageMappingHelper) {}

  public build(message: MessageEntity, currentUser: UserEntity): BaseMessage {
    return {
      id: message.id,
      timestamp: message.timestamp,
      author: message.author,
      authorId: message.authorId,
      authorName: message.author.username,
      chatId: message.chatId,
      seen: this.messageHelper.isMessageSeen(message),
      isCurrentUserAuthor: message.authorId === currentUser.id,
      isReadByCurrentUser: this.messageHelper.isMessageReadByUser(
        message,
        currentUser.id,
      ),
    };
  }
}
