import { IsIn, ValidateNested } from 'class-validator';
import { BaseCreateMessageDto } from './base-create-message.dto';
import { ApiProperty } from '@nestjs/swagger';
import { CreatePollDto } from '../../../polls/dto/create-poll/create-poll.dto';
import { Type } from 'class-transformer';

export class CreatePollMessageDto extends BaseCreateMessageDto {
  @IsIn(['poll'])
  @ApiProperty({ example: 'poll' })
  type: 'poll';

  @ValidateNested()
  @Type(() => CreatePollDto)
  @ApiProperty({ type: CreatePollDto })
  poll: CreatePollDto;
}
