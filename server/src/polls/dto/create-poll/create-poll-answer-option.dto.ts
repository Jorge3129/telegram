import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreatePollAnswerOptionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "I'm fine, thank you" })
  @Length(1, 100)
  text: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ example: false })
  isCorrectOption?: boolean;
}
