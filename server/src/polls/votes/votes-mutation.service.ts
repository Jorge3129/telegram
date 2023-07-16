import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/users/entity/user.entity';
import { EntityManager, In } from 'typeorm';
import { PollAnswerOptionEntity } from '../entity/poll-answer-option.entity';
import { PollVoteEntity } from '../entity/poll-vote.entity';
import { PollsQueryService } from '../poll-services/polls-query.service';
import { CreateVoteRequirement } from './requirements/create-vote-requirement';

@Injectable()
export class VotesMutationService {
  constructor(
    private entityManager: EntityManager,
    private pollsQueryService: PollsQueryService,
    private createVoteRequirement: CreateVoteRequirement,
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

    await this.createVoteRequirement.validate(
      answerOptionIds,
      answerOptions,
      poll,
    );

    const votes = answerOptions.map((answerOption) =>
      this.entityManager.create(PollVoteEntity, {
        answerOption,
        user,
      }),
    );

    return this.entityManager.save(PollVoteEntity, votes);
  }
}
