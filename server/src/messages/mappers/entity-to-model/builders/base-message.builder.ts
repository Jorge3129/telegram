import { Injectable } from '@nestjs/common';
import { MessageMappingHelper } from '../message-mapping.helper';
import { MessageEntity } from '../../../entity/message.entity';
import { UserEntity } from '../../../../users/entity/user.entity';
import { BaseMessage } from '../../../models/message.type';

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
