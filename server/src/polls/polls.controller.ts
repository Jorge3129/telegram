import { Body, Controller, Post } from '@nestjs/common';
import { PollEntity } from './entity/poll.entity';
import { EntityManager } from 'typeorm';
import { CreatePollDto } from './dto/create-poll/create-poll.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PollAnswerOptionEntity } from './entity/poll-answer-option.entity';

@ApiTags('Polls')
@Controller('polls')
export class PollsController {
  constructor(private entityManager: EntityManager) {}

  @Post()
  @ApiBearerAuth()
  public async createPoll(@Body() dto: CreatePollDto): Promise<PollEntity> {
    const answerOptions = dto.answerOptions.map((option, index) =>
      this.entityManager.create(PollAnswerOptionEntity, {
        ...option,
        optionIndex: index,
      }),
    );

    const poll = this.entityManager.create(PollEntity, {
      ...dto,
      answerOptions,
    });

    return this.entityManager.save(PollEntity, poll);
  }
}
