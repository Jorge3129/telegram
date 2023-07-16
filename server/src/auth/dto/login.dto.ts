import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'a' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'a' })
  @IsNotEmpty()
  password: string;
}
