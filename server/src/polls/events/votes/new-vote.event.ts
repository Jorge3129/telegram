import { AppEvent } from 'src/shared/services/app-event-emitter.service';
import { User } from 'src/users/user.type';
import { VoteEventType } from './vote-event-type';
import { PollEntity } from 'src/polls/entity/poll.entity';

export type NewVoteEventPayload = {
  poll: PollEntity;
  selectedAnswerOptionIds: string[];
  user: User;
};

export class NewVoteEvent implements AppEvent {
  public readonly type = VoteEventType.NEW;

  constructor(public readonly payload: NewVoteEventPayload) {}
}
