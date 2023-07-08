import { AppEvent } from 'src/shared/services/app-event-emitter.service';
import { MessageEntity } from '../entity/message.entity';
import { Message } from '../models/message.type';
import { User } from 'src/users/user.type';
import { MessageEventType } from './message-event-type';

export type CreateMessageEventPayload = {
  message: MessageEntity;
  messageResponse: Message;
  user: User;
};

export class CreateMessageEvent implements AppEvent {
  public readonly type = MessageEventType.CREATE;

  constructor(public readonly payload: CreateMessageEventPayload) {}
}
