import { MessageEventType } from './message-event-type';
import { Message } from '../models/message.type';
import { AppEvent } from '../../shared/services/app-event-emitter.service';
import { User } from '../../users/user.type';

export type ReadMessageEventPayload = {
  message: Message;
  user: User;
};

export class ReadMessageEvent implements AppEvent {
  public readonly type = MessageEventType.READ;

  constructor(public readonly payload: ReadMessageEventPayload) {}
}
