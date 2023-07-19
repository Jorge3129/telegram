import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/users/entity/user.entity';
import { EntityManager, In, Repository } from 'typeorm';
import { PollAnswerOptionEntity } from '../entity/poll-answer-option.entity';
import { PollVoteEntity } from '../entity/poll-vote.entity';
import { PollsQueryService } from '../poll-services/polls-query.service';
import { CreateVoteRequirement } from './requirements/create-vote-requirement';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class VotesMutationService {
  constructor(
    private entityManager: EntityManager,
    private pollsQueryService: PollsQueryService,
    private createVoteRequirement: CreateVoteRequirement,
    @InjectRepository(PollVoteEntity)
    private pollVotesRepo: Repository<PollVoteEntity>,
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

    return this.pollVotesRepo.save(votes);
  }

  public async retractVotes(pollId: string, user: UserEntity): Promise<void> {
    await this.entityManager.transaction(async (tx) => {
      const votes = await tx.find(PollVoteEntity, {
        where: {
          answerOption: {
            pollId: pollId,
          },
          userId: user.id,
        },
      });

      await tx.remove(votes);
    });
  }
}
