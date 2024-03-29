import { Injectable } from '@nestjs/common';
import { PollAnswerOptionEntity } from '../../entity/poll-answer-option.entity';
import { PollAnswerOption } from '../../models/poll.model';

@Injectable()
export class PollAnswerEntityToModelMapper {
  public mapEntityToModel(
    answerEntity: PollAnswerOptionEntity,
  ): PollAnswerOption {
    return {
      id: answerEntity.id,
      optionIndex: answerEntity.optionIndex,
      text: answerEntity.text,
    };
  }

  public mapEntitiesToModel(
    entities: PollAnswerOptionEntity[],
  ): PollAnswerOption[] {
    return entities.map((entity) => this.mapEntityToModel(entity));
  }
}
