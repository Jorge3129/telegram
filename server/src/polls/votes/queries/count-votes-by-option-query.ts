import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { PollAnswerOptionEntity } from '../../entity/poll-answer-option.entity';

export type CountVotesResult = {
  answerOptionId: string;
  votesCount: number;
  text: string;
};

@Injectable()
export class CountVotesByOptionQuery {
  public async execute(manager: EntityManager, pollId: string) {
    const qb = manager
      .createQueryBuilder()
      .from(PollAnswerOptionEntity, 'answer')
      .leftJoin('answer.votes', 'vote')
      .where('answer."pollId" = :pollId', { pollId })
      .select([
        'answer.id AS "answerOptionId"',
        'answer.text AS "text"',
        'COUNT(vote.userId)::INT AS "votesCount"',
      ])
      .groupBy('answer.id, answer.text')
      .orderBy('answer.optionIndex', 'ASC');

    return qb.getRawMany<CountVotesResult>();
  }
}
