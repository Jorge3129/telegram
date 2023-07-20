import { Provider } from '@nestjs/common';
import { PollDtoToEntityMapper } from './dto-to-entity/poll-dto-to-entity.mapper';
import { PollEntityToModelMapper } from './entity-to-model/poll.entity-to-model.mapper';
import { PollAnswerEntityToModelMapper } from './entity-to-model/poll-answer.entity-to-model.mapper';

export class PollMappersModule {
  public static get providers(): Provider[] {
    return [
      PollDtoToEntityMapper,
      PollAnswerEntityToModelMapper,
      PollEntityToModelMapper,
    ];
  }
}
