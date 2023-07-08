import { AppEvent } from 'src/shared/services/app-event-emitter.service';
import { User } from 'src/users/user.type';
import { MessageEventType } from './message-event-type';
import { Message } from '../models/message.type';

export type ReadMessageEventPayload = {
  message: Message;
  user: User;
};

export class ReadMessageEvent implements AppEvent {
  public readonly type = MessageEventType.READ;

  constructor(public readonly payload: ReadMessageEventPayload) {}
}
