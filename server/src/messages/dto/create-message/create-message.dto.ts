import { CreateGifMessageDto } from './create-gif-message.dto';
import { CreatePollMessageDto } from './create-poll-message.dto';
import { CreateTextMessageDto } from './create-text-message.dto';

export type CreateMessageDto =
  | CreateTextMessageDto
  | CreateGifMessageDto
  | CreatePollMessageDto;
