import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreatePollAnswerOptionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "I'm fine, thank you" })
  @Length(1, 100)
  text: string;

  @IsBoolean()
  @ApiProperty({ example: false })
  isCorrectOption: boolean;
}
