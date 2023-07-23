import { Injectable } from '@nestjs/common';
import { UserHasVotedInPollQuery } from '../queries/user-has-voted-in-poll.query';
import { EntityManager } from 'typeorm';

@Injectable()
export class UserHasVotedInPollRequirement {
  constructor(
    private userHasVotedQuery: UserHasVotedInPollQuery,
    private em: EntityManager,
  ) {}

  public async validate(userId: number, pollId: string): Promise<boolean> {
    const result = await this.userHasVotedQuery.execute(
      this.em,
      userId,
      pollId,
    );

    return result;
  }
}
