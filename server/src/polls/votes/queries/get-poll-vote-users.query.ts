import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import * as _ from 'lodash';
import { BasicUser } from '../../../users/user.type';
import { PollVoteEntity } from '../../entity/poll-vote.entity';

export type PollUserVote = BasicUser;

export type PollAnswerOptionWithUsers = {
  optionId: string;
  votedUsers: PollUserVote[];
};

type RawPollAnswerOptionWithUsers = {
  optionId: string;
  username: string;
  userId: number;
};

@Injectable()
export class GetPollVoteUsersQuery {
  public async execute(
    manager: EntityManager,
    pollId: string,
  ): Promise<PollAnswerOptionWithUsers[]> {
    const qb = manager
      .createQueryBuilder()
      .from(PollVoteEntity, 'vote')
      .innerJoin('vote.user', 'user')
      .innerJoin('vote.answerOption', 'answer')
      .where('answer."pollId" = :pollId', { pollId })
      .select([
        'answer.id AS "optionId"',
        'user.id AS "userId"',
        'user.username AS "username"',
      ])
      .orderBy('vote.createdAt', 'DESC');

    const resultRows = await qb.getRawMany<RawPollAnswerOptionWithUsers>();

    const groupedResults = _.groupBy(resultRows, 'optionId');

    return Object.entries(groupedResults).map(([optionId, votedUsers]) => ({
      optionId,
      votedUsers: votedUsers.map(
        (row): PollUserVote => ({
          id: row.userId,
          username: row.username,
        }),
      ),
    }));
  }
}
