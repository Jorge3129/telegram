import { Injectable } from '@nestjs/common';
import { PollVoteEntity } from 'src/polls/entity/poll-vote.entity';
import { PollEntity } from 'src/polls/entity/poll.entity';
import { Poll } from 'src/polls/models/poll.model';
import { VotesQueryService } from 'src/polls/votes/votes-query.service';
import { User } from 'src/users/user.type';
import { EntityManager } from 'typeorm';
import { PollAnswerEntityToModelMapper } from './poll-answer.entity-to-model.mapper';
import { PollVotesPercentage } from 'src/polls/models/poll-votes-percentage.model';
import { UserEntity } from 'src/users/entity/user.entity';

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
