import { Media } from "./media.model";

export type CreateMessageDto = {
  text: string;
  timestamp: string;
  chatId: number;
  media?: Media;
};
