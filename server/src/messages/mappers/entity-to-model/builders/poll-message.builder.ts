import { Injectable } from '@nestjs/common';
import { PollContentEntity } from 'src/messages/entity/message-content/message-content.entity';
import { MessageEntity } from 'src/messages/entity/message.entity';
import { PollMessage } from 'src/messages/models/message.type';
import { BaseMessageBuilder } from './base-message.builder';
import { PollEntity } from 'src/polls/entity/poll.entity';
import { Poll } from 'src/polls/models/poll.model';
import { User } from 'src/users/user.type';
import { PollEntityToModelMapper } from 'src/polls/mappers/entity-to-model/poll.entity-to-model.mapper';

@Injectable()
export class PollMessageBuilder {
  constructor(
    private baseMessageBuilder: BaseMessageBuilder,
    private pollMapper: PollEntityToModelMapper,
  ) {}

  public async build(
    message: MessageEntity,
    content: PollContentEntity,
    currentUser: User,
  ): Promise<PollMessage> {
    return {
      type: 'poll-message',
      poll: await this.buildPoll(content.poll, currentUser),
      ...this.baseMessageBuilder.build(message),
    };
  }

  private async buildPoll(
    pollEntity: PollEntity,
    currentUser: User,
  ): Promise<Poll> {
    return this.pollMapper.mapEntityToModel(pollEntity, currentUser);
  }
}
