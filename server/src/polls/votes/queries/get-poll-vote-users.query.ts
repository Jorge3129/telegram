import { Injectable } from '@nestjs/common';
import { BasicUser } from 'src/users/user.type';
import { EntityManager } from 'typeorm';
import * as _ from 'lodash';
import { PollVoteEntity } from 'src/polls/entity/poll-vote.entity';

type PollUserVote = BasicUser & { optionId: string };

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

    const results = resultRows.map(
      (row): PollUserVote => ({
        id: row.userId,
        username: row.username,
        optionId: row.optionId,
      }),
    );

    const groupedResults = _.groupBy(results, 'optionId');

    return Object.entries(groupedResults).map(([optionId, votedUsers]) => ({
      optionId,
      votedUsers,
    }));
  }
}
