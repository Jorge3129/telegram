import { AppEvent } from 'src/shared/services/app-event-emitter.service';
import { MessageEntity } from '../entity/message.entity';
import { User } from 'src/users/user.type';
import { MessageEventType } from './message-event-type';

export type DeleteMessageEventPayload = {
  message: MessageEntity;
  user: User;
};

export class DeleteMessageEvent implements AppEvent {
  public readonly type = MessageEventType.DELETE;

  constructor(public readonly payload: DeleteMessageEventPayload) {}
}
