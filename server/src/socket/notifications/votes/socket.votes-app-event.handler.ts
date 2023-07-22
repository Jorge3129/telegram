import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { VotesNotificationPublisher } from './votes-notification.publisher';
import { NewVoteEventPayload } from 'src/polls/events/votes/new-vote.event';
import { RetractVoteEventPayload } from 'src/polls/events/votes/retract-vote.event';
import { VoteEventType } from 'src/polls/events/votes/vote-event-type';
import { PollsQueryService } from 'src/polls/poll-services/polls-query.service';
import { VotesQueryService } from 'src/polls/votes/votes-query.service';

@Injectable()
export class SocketVotesAppEventHandler {
  constructor(
    private votesPublisher: VotesNotificationPublisher,
    private pollsService: PollsQueryService,
    private votesQueryService: VotesQueryService,
  ) {}

  @OnEvent(VoteEventType.NEW)
  public async handleNewVote(payload: NewVoteEventPayload) {
    const messages = await this.pollsService.findMessagesWithPoll(
      payload.poll.id,
    );

    const votePercentages = await this.votesQueryService.countVotePercentages(
      payload.poll.id,
    );

    await Promise.all(
      messages.map((message) =>
        this.votesPublisher.publishNewVote(
          {
            messageId: message.id,
            chatId: message.chatId,
            pollId: payload.poll.id,
            selectedAnswerOptionIds: payload.selectedAnswerOptionIds,
            user: payload.user,
            votePercentages,
          },
          message.chatId,
          payload.user.id,
        ),
      ),
    );
  }

  @OnEvent(VoteEventType.RETRACT)
  public async handleRetractVote(payload: RetractVoteEventPayload) {
    const messages = await this.pollsService.findMessagesWithPoll(
      payload.pollId,
    );

    const votePercentages = await this.votesQueryService.countVotePercentages(
      payload.pollId,
    );

    await Promise.all(
      messages.map((message) =>
        this.votesPublisher.publishRetractVote(
          {
            messageId: message.id,
            pollId: payload.pollId,
            user: payload.user,
            chatId: message.chatId,
            votePercentages,
          },
          message.chatId,
          payload.user.id,
        ),
      ),
    );
  }
}
