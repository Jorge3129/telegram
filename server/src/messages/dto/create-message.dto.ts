import { Media } from '../models/media.type';

export class CreateMessageDto {
  text: string;
  timestamp: string;
  chatId: number;
  media?: Media;
}
