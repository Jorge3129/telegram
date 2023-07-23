import { Injectable } from '@nestjs/common';
import { PollVoteEntity } from 'src/polls/entity/poll-vote.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class UserHasVotedInPollQuery {
  public async execute(
    manager: EntityManager,
    userId: number,
    pollId: string,
  ): Promise<boolean> {
    const qb = manager
      .createQueryBuilder()
      .from(PollVoteEntity, 'vote')
      .innerJoin('vote.answerOption', 'answer')
      .where('answer.pollId = :pollId', { pollId })
      .andWhere('vote.userId = :userId', { userId });

    const userVotesCount = await qb.getCount();

    return userVotesCount !== 0;
  }
}
