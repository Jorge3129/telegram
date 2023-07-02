import { Media } from "./media.type";

export interface Message {
  id: number;
  text: string;
  timestamp: string;
  author: string;
  authorId: number;
  chatId: number;
  seen?: boolean;
  seenBy?: number[];
  media?: Media;
}
