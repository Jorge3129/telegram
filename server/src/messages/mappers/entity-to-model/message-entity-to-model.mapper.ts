import { Injectable } from '@nestjs/common';
import { MessageEntity } from '../../entity/message.entity';
import { Message } from '../../models/message.type';
import { UnionMessageContentEntity } from '../../entity/message-content/message-content.entity';
import { TextMessageBuilder } from './builders/text-message-builder';
import { GifMessageBuilder } from './builders/gif-message.builder';
import {
  isGifContent,
  isPollContent,
} from '../../entity/message-content/message-content.type-guards';

@Injectable()
export class MessageEntityToModelMapper {
  constructor(
    private textMessageBuilder: TextMessageBuilder,
    private gifMessageBuilder: GifMessageBuilder,
  ) {}

  public mapEntityToModel(entity: MessageEntity): Message {
    const content = entity.content as UnionMessageContentEntity;

    if (isGifContent(content)) {
      return this.gifMessageBuilder.build(entity, content);
    }

    if (isPollContent(content)) {
      throw new Error('poll');
    }

    return this.textMessageBuilder.build(entity, content);
  }
}
