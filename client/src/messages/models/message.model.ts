import { Media } from "./media.model";

export interface Message {
  id: string;
  text: string;
  timestamp: string;
  authorName: string;
  authorId: number;
  chatId: number;
  seen: boolean;
  edited: boolean;
  media?: Media;
}

export type CreateMessageDto = {
  text: string;
  timestamp: string;
  chatId: number;
  media?: Media;
};
