import { AppEvent } from '../../../shared/services/app-event-emitter.service';
import { UserEntity } from '../../../users/entity/user.entity';
import { PollEntity } from '../../entity/poll.entity';
import { VoteEventType } from './vote-event-type';

export type NewVoteEventPayload = {
  poll: PollEntity;
  selectedAnswerOptionIds: string[];
  user: UserEntity;
};

export class NewVoteEvent implements AppEvent {
  public readonly type = VoteEventType.NEW;

  constructor(public readonly payload: NewVoteEventPayload) {}
}
