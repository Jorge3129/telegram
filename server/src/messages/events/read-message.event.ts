import { MessageEventType } from './message-event-type';
import { AppEvent } from '../../shared/services/app-event-emitter.service';
import { User } from '../../users/user.type';
import { MessageEntity } from '../entity/message.entity';

export type ReadMessageEventPayload = {
  message: MessageEntity;
  user: User;
};

export class ReadMessageEvent implements AppEvent {
  public readonly type = MessageEventType.READ;

  constructor(public readonly payload: ReadMessageEventPayload) {}
}
