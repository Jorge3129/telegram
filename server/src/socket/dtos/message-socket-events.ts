import { Message } from 'src/messages/models/message.type';

export enum MessageSocketEvents {
  NEW = 'message.new',
  EDIT = 'message.edit',
  DELETE = 'message.delete',
  READ = 'message.read',
}

export interface EditMessageSocketPayload {
  messageId: string;
  text: string;
  chatId: number;
}

export interface DeleteMessageSocketPayload {
  messageId: string;
}

export interface NewMessageSocketPayload {
  message: Message;
}

export interface SeenMessageSocketPayload {
  message: Message;
  userId: number;
}
