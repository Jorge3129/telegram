import { IsIn, IsObject } from 'class-validator';
import { BaseCreateMessageDto } from './base-create-message.dto';

export class CreateGifMessageDto extends BaseCreateMessageDto {
  @IsIn(['gif'])
  type: 'gif';

  @IsObject()
  srcObject: object;
}
