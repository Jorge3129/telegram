import { IsIn, IsObject } from 'class-validator';
import { BaseCreateMessageDto } from './base-create-message.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGifMessageDto extends BaseCreateMessageDto {
  @IsIn(['gif'])
  @ApiProperty({ example: 'gif' })
  type: 'gif';

  // TODO refactor gif storage
  @IsObject()
  @ApiProperty()
  srcObject: object;
}
