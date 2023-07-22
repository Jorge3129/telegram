import { Injectable } from '@nestjs/common';
import { PollAnswerOptionEntity } from 'src/polls/entity/poll-answer-option.entity';
import { EntityManager } from 'typeorm';
import { CountVotesResult } from '../votes-query.service';

@Injectable()
export class CountVotesByOptionQuery {
  public async execute(manager: EntityManager, pollId: string) {
    const qb = manager
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
}
