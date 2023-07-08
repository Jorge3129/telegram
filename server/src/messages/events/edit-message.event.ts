import { AppEvent } from 'src/shared/services/app-event-emitter.service';
import { MessageEntity } from '../entity/message.entity';
import { User } from 'src/users/user.type';
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
