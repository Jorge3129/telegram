import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PollAnswerOptionEntity } from 'src/polls/entity/poll-answer-option.entity';
import { PollVoteEntity } from 'src/polls/entity/poll-vote.entity';
import { UserEntity } from 'src/users/entity/user.entity';
import { EntityManager, Repository, In } from 'typeorm';
import { CreateVoteRequirement } from '../requirements/create-vote-requirement';
import { PollEntity } from 'src/polls/entity/poll.entity';

@Injectable()
export class CreateVoteService {
  constructor(
    private entityManager: EntityManager,
    private createVoteRequirement: CreateVoteRequirement,
    @InjectRepository(PollVoteEntity)
    private pollVotesRepo: Repository<PollVoteEntity>,
  ) {}

  public async createVote(
    poll: PollEntity,
    answerOptionIds: string[],
    user: UserEntity,
  ): Promise<PollVoteEntity[]> {
    const answerOptions = await this.findAnswerOptions(answerOptionIds);

    await this.createVoteRequirement.validate(
      answerOptionIds,
      answerOptions,
      poll,
      user,
    );

    const votes = this.createVotes(answerOptions, user);

    return this.pollVotesRepo.save(votes);
  }

  private createVotes(
    answerOptions: PollAnswerOptionEntity[],
    user: UserEntity,
  ): PollVoteEntity[] {
    return answerOptions.map((answerOption) =>
      this.entityManager.create(PollVoteEntity, {
        answerOption,
        user,
      }),
    );
  }

  private findAnswerOptions(
    answerOptionIds: string[],
  ): Promise<PollAnswerOptionEntity[]> {
    return this.entityManager.findBy(PollAnswerOptionEntity, {
      id: In(answerOptionIds),
    });
  }
}
