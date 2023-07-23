import { Injectable } from '@nestjs/common';
import { PollAnswerOptionEntity } from 'src/polls/entity/poll-answer-option.entity';
import { EntityManager } from 'typeorm';

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
