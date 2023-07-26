import { Poll } from '../../polls/models/poll.model';
import { User } from '../../users/user.type';
import { Media } from './media.type';

export interface BaseMessage {
  id: string;
  timestamp: string;
  authorName: string;
  authorId: number;
  author: User;
  chatId: number;
  seen: boolean;
  isReadByCurrentUser: boolean;
  isCurrentUserAuthor: boolean;
}

export interface TextMessage extends BaseMessage {
  type: 'text-message';
  edited: boolean;
  text: string;
  media: Media[];
}

export interface GifMessage extends BaseMessage {
  type: 'gif-message';
  srcObject: object;
}

export interface PollMessage extends BaseMessage {
  type: 'poll-message';
  poll: Poll;
}

export type Message = TextMessage | GifMessage | PollMessage;

export const isTextMessage = (message: Message): message is TextMessage =>
  message.type === 'text-message';
