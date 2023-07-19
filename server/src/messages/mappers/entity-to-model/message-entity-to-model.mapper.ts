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
import { PollMessageBuilder } from './builders/poll-message.builder';
import { User } from 'src/users/user.type';

@Injectable()
export class MessageEntityToModelMapper {
  constructor(
    private textMessageBuilder: TextMessageBuilder,
    private gifMessageBuilder: GifMessageBuilder,
    private pollMessageBuilder: PollMessageBuilder,
  ) {}

  public async mapEntityToModel(
    entity: MessageEntity,
    currentUser: User,
  ): Promise<Message> {
    const content = entity.content as UnionMessageContentEntity;

    if (isGifContent(content)) {
      return this.gifMessageBuilder.build(entity, content);
    }

    if (isPollContent(content)) {
      return this.pollMessageBuilder.build(entity, content, currentUser);
    }

    return this.textMessageBuilder.build(entity, content);
  }

  public mapEntitiesToModel(
    entities: MessageEntity[],
    currentUser: User,
  ): Promise<Message[]> {
    return Promise.all(
      entities.map((entity) => this.mapEntityToModel(entity, currentUser)),
    );
  }
}
