import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { VotesNotificationPublisher } from './votes-notification.publisher';
import { NewVoteEventPayload } from '../../../polls/events/votes/new-vote.event';
import { RetractVoteEventPayload } from '../../../polls/events/votes/retract-vote.event';
import { VoteEventType } from '../../../polls/events/votes/vote-event-type';
import { PollsQueryService } from '../../../polls/poll-services/polls-query.service';
import { VotesQueryService } from '../../../polls/votes/votes-query.service';

@Injectable()
export class SocketVotesAppEventHandler {
  constructor(
    private votesPublisher: VotesNotificationPublisher,
    private pollsService: PollsQueryService,
    private votesQueryService: VotesQueryService,
  ) {}

  @OnEvent(VoteEventType.NEW)
  public async handleNewVote(payload: NewVoteEventPayload) {
    const pollId = payload.poll.id;

    const messages = await this.pollsService.findMessagesWithPoll(pollId);

    const votePercentages = await this.votesQueryService.countVotePercentages(
      pollId,
      payload.user,
    );

    const totalVotesCount = await this.votesQueryService.countTotalVotes(
      pollId,
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
            totalVotesCount,
          },
          message.chatId,
          payload.user.id,
        ),
      ),
    );
  }

  @OnEvent(VoteEventType.RETRACT)
  // TODO ensure original user does not get this event
  public async handleRetractVote(payload: RetractVoteEventPayload) {
    const pollId = payload.pollId;

    const messages = await this.pollsService.findMessagesWithPoll(pollId);

    const votePercentages =
      await this.votesQueryService.countVotePercentagesForOtherUsers(pollId);

    const totalVotesCount = await this.votesQueryService.countTotalVotes(
      pollId,
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
            totalVotesCount,
          },
          message.chatId,
          payload.user.id,
        ),
      ),
    );
  }
}
