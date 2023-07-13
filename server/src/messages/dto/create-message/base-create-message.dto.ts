import { IsISO8601, IsNumber } from 'class-validator';

export class BaseCreateMessageDto {
  @IsISO8601({ strict: true })
  timestamp: string;

  @IsNumber()
  chatId: number;
}
