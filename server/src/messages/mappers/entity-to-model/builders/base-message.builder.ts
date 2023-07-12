import { Injectable } from '@nestjs/common';
import { MessageEntity } from 'src/messages/entity/message.entity';
import { BaseMessage } from 'src/messages/models/message.type';
import { MessageMappingHelper } from '../message-mapping.helper';

@Injectable()
export class BaseMessageBuilder {
  constructor(private messageHelper: MessageMappingHelper) {}

  public build(message: MessageEntity): BaseMessage {
    return {
      id: message.id,
      timestamp: message.timestamp,
      author: message.author,
      authorId: message.authorId,
      authorName: message.author.username,
      chatId: message.chatId,
      seen: this.messageHelper.isMessageSeen(message),
    };
  }
}
