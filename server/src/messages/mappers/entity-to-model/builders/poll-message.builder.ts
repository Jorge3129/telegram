import { Injectable } from '@nestjs/common';
import { PollContentEntity } from 'src/messages/entity/message-content/message-content.entity';
import { BaseMessage, PollMessage } from 'src/messages/models/message.type';
import { PollEntity } from 'src/polls/entity/poll.entity';
import { Poll } from 'src/polls/models/poll.model';
import { PollEntityToModelMapper } from 'src/polls/mappers/entity-to-model/poll.entity-to-model.mapper';
import { UserEntity } from 'src/users/entity/user.entity';

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
