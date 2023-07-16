import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager, FindOneOptions } from 'typeorm';
import { PollEntity } from '../entity/poll.entity';

@Injectable()
export class PollsQueryService {
  constructor(private entityManager: EntityManager) {}

  public async findOneOrFail(
    options: FindOneOptions<PollEntity>,
  ): Promise<PollEntity> {
    const poll = await this.entityManager.findOne(PollEntity, options);

    if (!poll) {
      throw new NotFoundException('Poll not found');
    }

    return poll;
  }
}
