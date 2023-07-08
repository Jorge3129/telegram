import { User } from 'src/users/user.type';
import { Media } from './media.type';

export interface Message {
  id: string;
  text: string;
  timestamp: string;
  authorName: string;
  authorId: number;
  author: User;
  chatId: number;
  seen: boolean;
  edited: boolean;
  media?: Media;
}
