import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { PollAnswerOptionEntity } from '../entity/poll-answer-option.entity';
import { PollVoteEntity } from '../entity/poll-vote.entity';
import { PollVotesPercentage } from '../models/poll-votes-percentage.model';

export type CountVotesResult = {
  answerOptionId: string;
  votesCount: number;
  text: string;
};

export type CountVotePercentagesResult = {
  answerOptionId: string;
  votesPercentage: string;
  text: string;
};

@Injectable()
export class VotesQueryService {
  constructor(private entityManager: EntityManager) {}

  public async countVotes(pollId: string): Promise<CountVotesResult[]> {
    const qb = this.entityManager
      .createQueryBuilder()
      .from(PollAnswerOptionEntity, 'answers')
      .leftJoin('answers.votes', 'votes')
      .where('answers."pollId" = :pollId', { pollId })
      .select([
        'answers."id" AS "answerOptionId"',
        'answers.text AS "text"',
        'COUNT(votes."userId")::INT AS "votesCount"',
      ])
      .groupBy('answers."id", answers.text')
      .orderBy('answers."optionIndex"', 'ASC');

    return qb.getRawMany<CountVotesResult>();
  }

  public async countVotePercentages(
    pollId: string,
  ): Promise<PollVotesPercentage[]> {
    const result = await this.entityManager.transaction(async (tx) => {
      const totalVotesResult = await tx
        .createQueryBuilder()
        .from(PollVoteEntity, 'votes')
        .innerJoin('votes.answerOption', 'answers')
        .where('answers."pollId" = :pollId', { pollId })
        .select('COUNT(DISTINCT votes."userId")::INT', 'count')
        .getRawOne<{ count: number }>();

      const totalVotes = totalVotesResult?.count ?? 0;

      if (!totalVotes) {
        return [];
      }

      const qb = tx
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
}
