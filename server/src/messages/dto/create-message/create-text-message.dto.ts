import { IsIn, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateMediaDto } from './create-media.dto';
import { BaseCreateMessageDto } from './base-create-message.dto';
import { Type } from 'class-transformer';

export class CreateTextMessageDto extends BaseCreateMessageDto {
  @IsIn(['text'])
  type: 'text';

  @IsString()
  text: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateMediaDto)
  media?: CreateMediaDto;
}
