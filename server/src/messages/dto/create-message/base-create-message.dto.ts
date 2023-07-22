import { IsNumber } from 'class-validator';

export class BaseCreateMessageDto {
  @IsNumber()
  chatId: number;
}
