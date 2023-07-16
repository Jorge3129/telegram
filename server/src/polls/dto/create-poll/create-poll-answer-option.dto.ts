import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreatePollAnswerOptionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "I'm fine, thank you" })
  text: string;

  @IsBoolean()
  @ApiProperty({ example: false })
  isCorrectOption: boolean;
}
