import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class EditMessageDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  textContent: string;
}
