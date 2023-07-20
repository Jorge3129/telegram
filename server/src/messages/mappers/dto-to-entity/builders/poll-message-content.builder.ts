import { Injectable } from '@nestjs/common';
import { CreatePollMessageDto } from 'src/messages/dto/create-message/create-poll-message.dto';
import { PollContentEntity } from 'src/messages/entity/message-content/message-content.entity';
import { PollDtoToEntityMapper } from 'src/polls/mappers/dto-to-entity/poll-dto-to-entity.mapper';

@Injectable()
export class PollMessageContentBuilder {
  constructor(private pollMapper: PollDtoToEntityMapper) {}

  public build(dto: CreatePollMessageDto): PollContentEntity {
    const pollContent = new PollContentEntity();

    pollContent.poll = this.pollMapper.mapDtoToEntity(dto.poll);

    return pollContent;
  }
}
