import { Injectable } from '@nestjs/common';
import { PollVoteEntity } from 'src/polls/entity/poll-vote.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class CountTotalDistinctUserVotesQuery {
  public async execute(manager: EntityManager, pollId: string) {
    const totalVotesResult = await manager
      .createQueryBuilder()
      .from(PollVoteEntity, 'votes')
      .innerJoin('votes.answerOption', 'answers')
      .where('answers."pollId" = :pollId', { pollId })
      .select('COUNT(DISTINCT votes."userId")::INT', 'count')
      .getRawOne<{ count: number }>();

    return totalVotesResult?.count ?? 0;
  }
}
