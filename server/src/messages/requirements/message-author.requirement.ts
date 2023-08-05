import { Injectable } from '@nestjs/common';
import { MessageEntity } from '../entity/message.entity';
import { Message } from '../models/message.type';

@Injectable()
export class MessageAuthorRequirement {
  public async validate(
    currentUserId: number,
    message: MessageEntity | Message,
  ): Promise<boolean> {
    return message.authorId === currentUserId;
  }
}
