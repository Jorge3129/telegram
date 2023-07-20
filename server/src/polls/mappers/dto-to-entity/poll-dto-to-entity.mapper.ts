import { Injectable } from '@nestjs/common';
import { PollEntity } from '../../entity/poll.entity';
import { CreatePollDto } from '../../dto/create-poll/create-poll.dto';
import { EntityManager } from 'typeorm';
import { PollAnswerOptionEntity } from '../../entity/poll-answer-option.entity';

@Injectable()
export class PollDtoToEntityMapper {
  constructor(private entityManager: EntityManager) {}

  public mapDtoToEntity(dto: CreatePollDto): PollEntity {
    const answerOptions = dto.answerOptions.map((option, index) =>
      this.entityManager.create(PollAnswerOptionEntity, {
        ...option,
        optionIndex: index,
      }),
    );

    return this.entityManager.create(PollEntity, {
      ...dto,
      answerOptions,
    });
  }
}
