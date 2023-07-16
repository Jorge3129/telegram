import { IsIn, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateMediaDto } from './create-media.dto';
import { BaseCreateMessageDto } from './base-create-message.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTextMessageDto extends BaseCreateMessageDto {
  @IsIn(['text'])
  @ApiProperty({ example: 'text' })
  type: 'text';

  @IsString()
  @ApiProperty()
  text: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateMediaDto)
  @ApiProperty({ type: CreateMediaDto })
  media?: CreateMediaDto;
}
