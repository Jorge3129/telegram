import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { PollVotesPercentage } from '../models/poll-votes-percentage.model';
import { CountVotePercentagesQuery } from './queries/count-vote-percentages.query';
import { CountVotesByOptionQuery } from './queries/count-votes-by-option-query';
import {
  GetPollVoteUsersQuery,
  PollAnswerOptionWithUsers,
} from './queries/get-poll-vote-users.query';

export type CountVotesResult = {
  answerOptionId: string;
  votesCount: number;
  text: string;
};

@Injectable()
export class VotesQueryService {
  constructor(
    private em: EntityManager,
    private countVotePercentageQuery: CountVotePercentagesQuery,
    private countVotesByOptionQuery: CountVotesByOptionQuery,
    private getPollVoteUsersQuery: GetPollVoteUsersQuery,
  ) {}

  public async countVotes(pollId: string): Promise<CountVotesResult[]> {
    return this.countVotesByOptionQuery.execute(this.em, pollId);
  }

  public async countVotePercentages(
    pollId: string,
  ): Promise<PollVotesPercentage[]> {
    return this.countVotePercentageQuery.execute(this.em, pollId);
  }

  public async getPollVotedUsers(
    pollId: string,
  ): Promise<PollAnswerOptionWithUsers[]> {
    return this.getPollVoteUsersQuery.execute(this.em, pollId);
  }
}
