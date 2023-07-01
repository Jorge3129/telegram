import { Media } from "./media.type";

export interface Message {
  text: string;
  timestamp: string;
  author: string;
  chatId: number;
  messageId: number;
  seen?: boolean;
  seenBy?: string[];
  media?: Media;
}

export interface PersonalMessage extends Message {}

export interface GroupMessage extends Message {
  seenBy?: string[];
}
