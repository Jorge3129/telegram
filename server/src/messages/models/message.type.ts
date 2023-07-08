import { User } from 'src/users/user.type';
import { Media } from './media.type';

export interface BaseMessage {
  id: string;
  text: string;
  timestamp: string;
  authorName: string;
  authorId: number;
  author: User;
  chatId: number;
  seen: boolean;
}

export interface TextMessage extends BaseMessage {
  type: 'text-message';
  edited: boolean;
  text: string;
  media: Media[];
}

export type Message = TextMessage;

export const isTextMessage = (message: Message): message is TextMessage =>
  message.type === 'text-message';
