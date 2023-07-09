import { IsISO8601, IsNumber, IsObject } from 'class-validator';

export class CreateGifMessageDto {
  @IsISO8601({ strict: true })
  timestamp: string;

  @IsNumber()
  chatId: number;

  @IsObject()
  srcObject: object;
}
