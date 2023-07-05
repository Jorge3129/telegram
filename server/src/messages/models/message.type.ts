import { Media } from './media.type';

export interface Message {
  id: string;
  text: string;
  timestamp: string;
  author: string;
  authorId: number;
  chatId: number;
  seen?: boolean;
  seenBy?: number[];
  media?: Media;
}

export type CreateMessageDto = Omit<Message, 'id'>;
