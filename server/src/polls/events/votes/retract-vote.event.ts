import { AppEvent } from 'src/shared/services/app-event-emitter.service';
import { VoteEventType } from './vote-event-type';
import { UserEntity } from 'src/users/entity/user.entity';

export type RetractVoteEventPayload = {
  pollId: string;
  user: UserEntity;
};

export class RetractVoteEvent implements AppEvent {
  public readonly type = VoteEventType.RETRACT;

  constructor(public readonly payload: RetractVoteEventPayload) {}
}
