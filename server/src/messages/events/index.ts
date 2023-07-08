import { CreateMessageEvent } from './create-message.event';
import { DeleteMessageEvent } from './delete-message.event';
import { EditMessageEvent } from './edit-message.event';
import { ReadMessageEvent } from './read-message.event';

export type AppMessageEvent =
  | CreateMessageEvent
  | EditMessageEvent
  | DeleteMessageEvent
  | ReadMessageEvent;
