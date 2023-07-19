import { IGif } from "@giphy/js-types";
import { User } from "../../users/models/user.model";
import { Media } from "./media.model";
import { Poll } from "../../polls/models/poll.model";

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
  poll: Poll;
}

export interface GifMessage extends BaseMessage {
  type: "gif-message";
  srcObject: IGif;
}

export type Message = TextMessage | PollMessage | GifMessage;

export const isTextMessage = (message: Message): message is TextMessage =>
  (message as TextMessage).type === "text-message";

export const isGifMessage = (message: Message): message is GifMessage =>
  (message as GifMessage).type === "gif-message";

export const isPollMessage = (message: Message): message is PollMessage =>
  (message as PollMessage).type === "poll-message";
