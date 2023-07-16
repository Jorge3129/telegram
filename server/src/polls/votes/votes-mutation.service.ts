import { Injectable, BadRequestException } from '@nestjs/common';
import { UserEntity } from 'src/users/entity/user.entity';
import { EntityManager, In } from 'typeorm';
import { PollEntity } from '../entity/poll.entity';
import { PollAnswerOptionEntity } from '../entity/poll-answer-option.entity';
import { PollVoteEntity } from '../entity/poll-vote.entity';
import { PollsQueryService } from '../poll-services/polls-query.service';
import * as _ from 'lodash';

@Injectable()
export class VotesMutationService {
  constructor(
    private entityManager: EntityManager,
    private pollsQueryService: PollsQueryService,
  ) {}

  public async vote(
    pollId: string,
    answerOptionIds: string[],
    user: UserEntity,
  ): Promise<PollVoteEntity[]> {
    const poll = await this.pollsQueryService.findOneOrFail({
      where: {
        id: pollId,
      },
    });

    const answerOptions = await this.entityManager.findBy(
      PollAnswerOptionEntity,
      {
        id: In(answerOptionIds),
      },
    );

    this.validateNewVotes(answerOptionIds, answerOptions, poll);

    const votes = answerOptions.map((answerOption) =>
      this.entityManager.create(PollVoteEntity, {
        answerOption,
        user,
      }),
    );

    return this.entityManager.save(PollVoteEntity, votes);
  }

  private validateNewVotes(
    answerOptionIds: string[],
    answerOptions: PollAnswerOptionEntity[],
    poll: PollEntity,
  ) {
    if (_.uniq(answerOptionIds).length !== answerOptionIds.length) {
      throw new BadRequestException('Votes should be unique');
    }

    if (answerOptions.length !== answerOptionIds.length) {
      throw new BadRequestException('Some votes are invalid');
    }

    if (answerOptions.some((option) => option.pollId !== poll.id)) {
      throw new BadRequestException('Some votes are in another poll');
    }

    if (!poll.isMultipleChoice && answerOptions.length > 1) {
      throw new BadRequestException('Cannot choose multiple options');
    }
  }
}
