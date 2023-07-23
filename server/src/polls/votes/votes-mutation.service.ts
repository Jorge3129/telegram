import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/users/entity/user.entity';
import { PollVoteEntity } from '../entity/poll-vote.entity';
import { PollsQueryService } from '../poll-services/polls-query.service';
import { AppEventEmitter } from 'src/shared/services/app-event-emitter.service';
import { NewVoteEvent } from '../events/votes/new-vote.event';
import { RetractVoteEvent } from '../events/votes/retract-vote.event';
import { CreateVoteService } from './operations/create-vote.service';
import { RetractVoteService } from './operations/retract-vote.service';

@Injectable()
export class VotesMutationService {
  constructor(
    private pollsQueryService: PollsQueryService,
    private createVoteService: CreateVoteService,
    private retractVoteService: RetractVoteService,
    private eventEmitter: AppEventEmitter,
  ) {}

  public async vote(
    pollId: string,
    answerOptionIds: string[],
    user: UserEntity,
  ): Promise<PollVoteEntity[]> {
    const poll = await this.pollsQueryService.findOneByIdOrFail(pollId);

    const savedVotes = await this.createVoteService.createVote(
      poll,
      answerOptionIds,
      user,
    );

    this.eventEmitter.emit(
      new NewVoteEvent({
        poll,
        selectedAnswerOptionIds: answerOptionIds,
        user,
      }),
    );

    return savedVotes;
  }

  public async retractVotes(pollId: string, user: UserEntity): Promise<void> {
    const poll = await this.pollsQueryService.findOneByIdOrFail(pollId);

    await this.retractVoteService.retractVotes(poll, user);

    this.eventEmitter.emit(
      new RetractVoteEvent({
        pollId,
        user,
      }),
    );
  }
}
