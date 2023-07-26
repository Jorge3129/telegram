import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { PollAnswerEntityToModelMapper } from './poll-answer.entity-to-model.mapper';
import { UserEntity } from '../../../users/entity/user.entity';
import { User } from '../../../users/user.type';
import { PollVoteEntity } from '../../entity/poll-vote.entity';
import { PollEntity } from '../../entity/poll.entity';
import { PollVotesPercentage } from '../../models/poll-votes-percentage.model';
import { Poll } from '../../models/poll.model';
import { VotesQueryService } from '../../votes/votes-query.service';

@Injectable()
export class PollEntityToModelMapper {
  constructor(
    private entityManager: EntityManager,
    private votesQueryService: VotesQueryService,
    private pollAnswerMapper: PollAnswerEntityToModelMapper,
  ) {}

  public async mapEntityToModel(
    pollEntity: PollEntity,
    currentUser: User,
  ): Promise<Poll> {
    const userSelectedOptionIds = await this.getUserVotes(
      pollEntity.id,
      currentUser.id,
    );

    return {
      id: pollEntity.id,
      question: pollEntity.question,
      isAnonymous: pollEntity.isAnonymous,
      isMultipleChoice: pollEntity.isMultipleChoice,
      isQuiz: pollEntity.isQuiz,
      answerOptions: this.pollAnswerMapper.mapEntitiesToModel(
        pollEntity.answerOptions,
      ),
      userSelectedOptionIds,
      votesPercentages: await this.getVotesPercentages(
        pollEntity.id,
        userSelectedOptionIds,
        currentUser,
      ),
    };
  }

  private async getVotesPercentages(
    pollId: string,
    userSelectedOptionIds: string[],
    user: User,
  ): Promise<PollVotesPercentage[]> {
    if (!userSelectedOptionIds.length) {
      return [];
    }

    return this.votesQueryService.countVotePercentages(
      pollId,
      user as UserEntity,
    );
  }

  // TODO separate into service
  private async getUserVotes(
    pollId: string,
    userId: number,
  ): Promise<string[]> {
    return this.entityManager
      .find(PollVoteEntity, {
        where: {
          answerOption: {
            pollId: pollId,
          },
          userId: userId,
        },
      })
      .then((votes) => votes.map((vote) => vote.answerOptionId));
  }
}
