import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { PollVotesPercentage } from '../models/poll-votes-percentage.model';
import { CountVotePercentagesQuery } from './queries/count-vote-percentages.query';
import {
  GetPollVoteUsersQuery,
  PollAnswerOptionWithUsers,
} from './queries/get-poll-vote-users.query';
import { GetVoteResultsRequirement } from './requirements/get-vote-results.requirement';
import { PollsQueryService } from '../poll-services/polls-query.service';
import { GetVotePercentagesRequirement } from './requirements/get-vote-percentages.requirement';
import { UserEntity } from '../../users/entity/user.entity';
import { CountTotalDistinctUserVotesQuery } from './queries/count-total-distinct-user-votes.query';

@Injectable()
export class VotesQueryService {
  constructor(
    private em: EntityManager,
    private countVotePercentageQuery: CountVotePercentagesQuery,
    private countTotalVotesQuery: CountTotalDistinctUserVotesQuery,
    private getPollVoteUsersQuery: GetPollVoteUsersQuery,
    private getVoteResultsRequirement: GetVoteResultsRequirement,
    private getVotePercentagesRequirement: GetVotePercentagesRequirement,
    private pollQueryService: PollsQueryService,
  ) {}

  public async countVotePercentages(
    pollId: string,
    currentUser: UserEntity,
  ): Promise<PollVotesPercentage[]> {
    const poll = await this.findPoll(pollId);

    await this.getVotePercentagesRequirement.validate(poll, currentUser);

    return this.countVotePercentageQuery.execute(this.em, pollId);
  }

  public async countVotePercentagesForOtherUsers(
    pollId: string,
  ): Promise<PollVotesPercentage[]> {
    return this.countVotePercentageQuery.execute(this.em, pollId);
  }

  public async countTotalVotes(pollId: string): Promise<number> {
    return this.countTotalVotesQuery.execute(this.em, pollId);
  }

  public async getPollVotedUsers(
    pollId: string,
    currentUser: UserEntity,
  ): Promise<PollAnswerOptionWithUsers[]> {
    const poll = await this.findPoll(pollId);

    await this.getVoteResultsRequirement.validate(poll, currentUser);

    return this.getPollVoteUsersQuery.execute(this.em, pollId);
  }

  private findPoll(id: string) {
    return this.pollQueryService.findOneByIdOrFail(id);
  }
}
