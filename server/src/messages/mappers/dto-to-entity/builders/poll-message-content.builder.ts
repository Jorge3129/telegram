import { Injectable } from '@nestjs/common';
import { PollDtoToEntityMapper } from '../../../../polls/mappers/dto-to-entity/poll-dto-to-entity.mapper';
import { CreatePollMessageDto } from '../../../dto/create-message/create-poll-message.dto';
import { PollContentEntity } from '../../../entity/message-content/message-content.entity';

@Injectable()
export class PollMessageContentBuilder {
  constructor(private pollMapper: PollDtoToEntityMapper) {}

  public build(dto: CreatePollMessageDto): PollContentEntity {
    const pollContent = new PollContentEntity();

    pollContent.poll = this.pollMapper.mapDtoToEntity(dto.poll);

    return pollContent;
  }
}
