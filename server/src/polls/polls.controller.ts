import { Body, Controller, Post } from '@nestjs/common';
import { PollEntity } from './entity/poll.entity';
import { EntityManager } from 'typeorm';
import { CreatePollDto } from './dto/create-poll/create-poll.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PollDtoToEntityMapper } from './mappers/dto-to-entity/poll-dto-to-entity.mapper';

@ApiTags('Polls')
@Controller('polls')
export class PollsController {
  constructor(
    private entityManager: EntityManager,
    private pollMapper: PollDtoToEntityMapper,
  ) {}

  @Post()
  @ApiBearerAuth()
  public async createPoll(@Body() dto: CreatePollDto): Promise<PollEntity> {
    const poll = this.pollMapper.mapDtoToEntity(dto);

    return this.entityManager.save(PollEntity, poll);
  }
}
