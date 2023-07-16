import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { PollAnswerOptionEntity } from '../entity/poll-answer-option.entity';
import { PollVoteEntity } from '../entity/poll-vote.entity';

export type CountVotesResult = {
  answerOptionId: string;
  votesCount: number;
  text: string;
};

export type CountVotePercentagesResult = {
  answerOptionId: string;
  votesPercentage: number;
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
  ): Promise<CountVotePercentagesResult[]> {
    const result = await this.entityManager.transaction(async (tx) => {
      const totalVotes = await tx
        .createQueryBuilder()
        .from(PollVoteEntity, 'votes')
        .innerJoin('votes.answerOption', 'answers')
        .where('answers."pollId" = :pollId', { pollId })
        .getCount();

      console.log({ totalVotes });

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
      (answer): CountVotePercentagesResult => ({
        ...answer,
        votesPercentage: Math.round(parseFloat(`${answer.votesPercentage}`)),
      }),
    );
  }
}
