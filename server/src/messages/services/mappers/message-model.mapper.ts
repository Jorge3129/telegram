import { Injectable } from '@nestjs/common';
import { MessageEntity } from '../../entity/message.entity';
import { Message } from '../../models/message.type';
import {
  UnionMessageContentEntity,
  isGifContent,
} from '../../entity/message-content.entity';
import { TextMessageBuilder } from './builders/text-message-builder';
import { GifMessageBuilder } from './builders/gif-message.builder';

@Injectable()
export class MessageModelMapper {
  constructor(
    private textMessageBuilder: TextMessageBuilder,
    private gifMessageBuilder: GifMessageBuilder,
  ) {}

  public mapEntityToModel(entity: MessageEntity): Message {
    const content = entity.content as UnionMessageContentEntity;

    if (isGifContent(content)) {
      return this.gifMessageBuilder.build(entity, content);
    }

    return this.textMessageBuilder.build(entity, content);
  }
}
