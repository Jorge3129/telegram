import { Injectable } from '@nestjs/common';
import { MessageEntity } from 'src/messages/entity/message.entity';

@Injectable()
export class MessageMappingHelper {
  public isMessageSeen(message: MessageEntity): boolean {
    return !!message.reads?.find((read) => read.userId !== message.authorId);
  }
}
