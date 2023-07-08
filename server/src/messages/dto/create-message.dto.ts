import {
  IsISO8601,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateMediaDto } from './create-media.dto';

export class CreateMessageDto {
  @IsString()
  text: string;

  @IsISO8601({ strict: true })
  timestamp: string;

  @IsNumber()
  chatId: number;

  @IsOptional()
  @ValidateNested()
  media?: CreateMediaDto;
}
