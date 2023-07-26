import { Injectable } from '@nestjs/common';
import { MessageEntity } from '../../entity/message.entity';

@Injectable()
export class MessageMappingHelper {
  public isMessageSeen(message: MessageEntity): boolean {
    return !!message.reads?.find((read) => read.userId !== message.authorId);
  }

  public isMessageReadByUser(message: MessageEntity, userId: number): boolean {
    return !!message.reads?.find((read) => read.userId === userId);
  }
}
