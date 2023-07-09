import { Media } from "./media.model";
import { IGif } from "@giphy/js-types";

export type CreateMessageDto = {
  text: string;
  timestamp: string;
  chatId: number;
  media?: Media;
};

export type CreateGifMessageDto = {
  timestamp: string;
  chatId: number;
  srcObject: IGif;
};
