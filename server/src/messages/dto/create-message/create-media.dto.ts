import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMediaDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'foo.jpg' })
  filename: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'video/mp4' })
  type: string;
}
