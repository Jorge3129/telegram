import { AppEvent } from 'src/shared/services/app-event-emitter.service';
import { VoteEventType } from './vote-event-type';
import { PollEntity } from 'src/polls/entity/poll.entity';
import { UserEntity } from 'src/users/entity/user.entity';

export type NewVoteEventPayload = {
  poll: PollEntity;
  selectedAnswerOptionIds: string[];
  user: UserEntity;
};

export class NewVoteEvent implements AppEvent {
  public readonly type = VoteEventType.NEW;

  constructor(public readonly payload: NewVoteEventPayload) {}
}
