import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { PollVoteEntity } from '../../entity/poll-vote.entity';

@Injectable()
export class CountTotalDistinctUserVotesQuery {
  public async execute(manager: EntityManager, pollId: string) {
    const totalVotesResult = await manager
      .createQueryBuilder()
      .from(PollVoteEntity, 'vote')
      .innerJoin('vote.answerOption', 'answer')
      .where('answer.pollId = :pollId', { pollId })
      .select('COUNT(DISTINCT vote.userId)::INT', 'count')
      .getRawOne<{ count: number }>();

    return totalVotesResult?.count ?? 0;
  }
}
