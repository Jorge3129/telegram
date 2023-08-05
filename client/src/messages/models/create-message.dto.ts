import { CreatePollDto } from "../../polls/dto/create-poll.dto";
import { Media } from "./media.model";
import { IGif } from "@giphy/js-types";

export interface BaseCreateMessageDto {
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

export interface CreatePollMessageDto extends BaseCreateMessageDto {
  type: "poll";
  poll: CreatePollDto;
}

export type CreateMessageDto = CreateTextMessageDto | CreateGifMessageDto;
