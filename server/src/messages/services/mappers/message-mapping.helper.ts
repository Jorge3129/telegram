import { Injectable } from '@nestjs/common';
import { MessageEntity } from 'src/messages/entity/message.entity';
import { BaseMessage } from 'src/messages/models/message.type';

@Injectable()
export class MessageMappingHelper {
  public getBaseMessage(message: MessageEntity): BaseMessage {
    return {
      id: message.id,
      timestamp: message.timestamp,
      author: message.author,
      authorId: message.authorId,
      authorName: message.author.username,
      chatId: message.chatId,
      seen: this.isMessageSeen(message),
    };
  }

  public isMessageSeen(message: MessageEntity): boolean {
    return !!message.reads?.find((read) => read.userId !== message.authorId);
  }
}
