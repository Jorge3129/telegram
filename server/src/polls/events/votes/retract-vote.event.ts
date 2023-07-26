import { AppEvent } from '../../../shared/services/app-event-emitter.service';
import { UserEntity } from '../../../users/entity/user.entity';
import { VoteEventType } from './vote-event-type';

export type RetractVoteEventPayload = {
  pollId: string;
  user: UserEntity;
};

export class RetractVoteEvent implements AppEvent {
  public readonly type = VoteEventType.RETRACT;

  constructor(public readonly payload: RetractVoteEventPayload) {}
}
