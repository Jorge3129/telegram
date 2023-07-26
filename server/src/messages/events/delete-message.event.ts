import { AppEvent } from '../../shared/services/app-event-emitter.service';
import { User } from '../../users/user.type';
import { MessageEntity } from '../entity/message.entity';
import { MessageEventType } from './message-event-type';

export type DeleteMessageEventPayload = {
  message: MessageEntity;
  user: User;
};

export class DeleteMessageEvent implements AppEvent {
  public readonly type = MessageEventType.DELETE;

  constructor(public readonly payload: DeleteMessageEventPayload) {}
}
