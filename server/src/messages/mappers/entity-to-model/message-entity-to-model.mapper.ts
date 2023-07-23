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
import { UserEntity } from 'src/users/entity/user.entity';
import { BaseMessageBuilder } from './builders/base-message.builder';

@Injectable()
export class MessageEntityToModelMapper {
  constructor(
    private textMessageBuilder: TextMessageBuilder,
    private gifMessageBuilder: GifMessageBuilder,
    private pollMessageBuilder: PollMessageBuilder,
    private baseMessageBuilder: BaseMessageBuilder,
  ) {}

  public async mapEntityToModel(
    entity: MessageEntity,
    currentUser: UserEntity,
  ): Promise<Message> {
    const baseMessage = this.baseMessageBuilder.build(entity, currentUser);

    const content = entity.content as UnionMessageContentEntity;

    if (isGifContent(content)) {
      return this.gifMessageBuilder.build(baseMessage, content);
    }

    if (isPollContent(content)) {
      return this.pollMessageBuilder.build(baseMessage, content, currentUser);
    }

    return this.textMessageBuilder.build(baseMessage, entity, content);
  }

  public mapEntitiesToModel(
    entities: MessageEntity[],
    currentUser: UserEntity,
  ): Promise<Message[]> {
    return Promise.all(
      entities.map((entity) => this.mapEntityToModel(entity, currentUser)),
    );
  }
}
