import { AppEvent } from 'src/shared/services/app-event-emitter.service';
import { User } from 'src/users/user.type';
import { VoteEventType } from './vote-event-type';

export type RetractVoteEventPayload = {
  pollId: string;
  user: User;
};

export class RetractVoteEvent implements AppEvent {
  public readonly type = VoteEventType.RETRACT;

  constructor(public readonly payload: RetractVoteEventPayload) {}
}
