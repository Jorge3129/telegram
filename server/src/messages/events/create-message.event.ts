import { AppEvent } from '../../shared/services/app-event-emitter.service';
import { User } from '../../users/user.type';
import { MessageEntity } from '../entity/message.entity';
import { Message } from '../models/message.type';
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
