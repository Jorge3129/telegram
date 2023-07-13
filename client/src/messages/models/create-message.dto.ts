import { Media } from "./media.model";
import { IGif } from "@giphy/js-types";

export interface BaseCreateMessageDto {
  timestamp: string;
  chatId: number;
}

export interface CreateTextMessageDto extends BaseCreateMessageDto {
  type: "text";
  text: string;
  media?: Media;
}

export interface CreateGifMessageDto extends BaseCreateMessageDto {
  type: "gif";
  srcObject: IGif;
}

export type CreateMessageDto = CreateTextMessageDto | CreateGifMessageDto;
