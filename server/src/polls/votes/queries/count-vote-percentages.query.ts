import { PollAnswerOptionEntity } from 'src/polls/entity/poll-answer-option.entity';
import { PollVotesPercentage } from 'src/polls/models/poll-votes-percentage.model';
import { EntityManager } from 'typeorm';
import { CountTotalDistinctUserVotesQuery } from './count-total-distinct-user-votes.query';
import { Injectable } from '@nestjs/common';

type CountVotePercentagesResult = {
  answerOptionId: string;
  votesPercentage: string;
  text: string;
};

@Injectable()
export class CountVotePercentagesQuery {
  constructor(
    private countTotalDistinctUserVotesQuery: CountTotalDistinctUserVotesQuery,
  ) {}

  public async execute(
    manager: EntityManager,
    pollId: string,
  ): Promise<PollVotesPercentage[]> {
    const result = await manager.transaction(async (txManager) => {
      const totalVotes = this.countDistinctUserVotesForPoll(txManager, pollId);

      if (!totalVotes) {
        return [];
      }

      const qb = txManager
        .createQueryBuilder()
        .from(PollAnswerOptionEntity, 'answers')
        .leftJoin('answers.votes', 'votes')
        .where('answers."pollId" = :pollId', { pollId })
        .select([
          'answers."id" AS "answerOptionId"',
          'answers.text AS "text"',
          `(COUNT(votes."userId")::DECIMAL / ${totalVotes} * 100) AS "votesPercentage"`,
        ])
        .groupBy('answers."id", answers.text')
        .orderBy('answers."optionIndex"', 'ASC');

      return qb.getRawMany<CountVotePercentagesResult>();
    });

    return result.map(
      (answer): PollVotesPercentage => ({
        ...answer,
        votesPercentage: Math.round(parseFloat(answer.votesPercentage)),
      }),
    );
  }

  private async countDistinctUserVotesForPoll(
    manager: EntityManager,
    pollId: string,
  ) {
    return this.countTotalDistinctUserVotesQuery.execute(manager, pollId);
  }
}
