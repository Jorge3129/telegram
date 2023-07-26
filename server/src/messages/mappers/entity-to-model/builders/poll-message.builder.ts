import { Injectable } from '@nestjs/common';
import { PollEntity } from '../../../../polls/entity/poll.entity';
import { PollEntityToModelMapper } from '../../../../polls/mappers/entity-to-model/poll.entity-to-model.mapper';
import { Poll } from '../../../../polls/models/poll.model';
import { UserEntity } from '../../../../users/entity/user.entity';
import { PollContentEntity } from '../../../entity/message-content/message-content.entity';
import { BaseMessage, PollMessage } from '../../../models/message.type';

@Injectable()
export class PollMessageBuilder {
  constructor(private pollMapper: PollEntityToModelMapper) {}

  public async build(
    baseMessage: BaseMessage,
    content: PollContentEntity,
    currentUser: UserEntity,
  ): Promise<PollMessage> {
    return {
      type: 'poll-message',
      poll: await this.buildPoll(content.poll, currentUser),
      ...baseMessage,
    };
  }

  private async buildPoll(
    pollEntity: PollEntity,
    currentUser: UserEntity,
  ): Promise<Poll> {
    return this.pollMapper.mapEntityToModel(pollEntity, currentUser);
  }
}
