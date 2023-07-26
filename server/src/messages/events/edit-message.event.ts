import { AppEvent } from '../../shared/services/app-event-emitter.service';
import { User } from '../../users/user.type';
import { MessageEntity } from '../entity/message.entity';
import { MessageEventType } from './message-event-type';

export type EditMessageEventPayload = {
  message: MessageEntity;
  editedText: string;
  user: User;
};

export class EditMessageEvent implements AppEvent {
  public readonly type = MessageEventType.EDIT;

  constructor(public readonly payload: EditMessageEventPayload) {}
}
