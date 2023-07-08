import { User } from "../../users/models/user.model";
import { Media } from "./media.model";

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
  type: "text-message";
  edited: boolean;
  text: string;
  media: Media[];
}

export interface PollMessage extends BaseMessage {
  type: "poll-message";
}

export type Message = TextMessage | PollMessage;

export const isTextMessage = (message: Message): message is TextMessage =>
  message.type === "text-message";
