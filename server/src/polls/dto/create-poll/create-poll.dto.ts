import { Type } from 'class-transformer';
import { CreatePollAnswerOptionDto } from './create-poll-answer-option.dto';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsBoolean,
  IsNotEmpty,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { pollAnswerOptionsExample } from './poll-answer-options.example';

export class CreatePollDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'How are you?' })
  @Length(1, 255)
  question: string;

  @IsBoolean()
  @ApiProperty({ example: true })
  isAnonymous: boolean;

  @IsBoolean()
  @ApiProperty({ example: false })
  isMultipleChoice: boolean;

  @IsBoolean()
  @ApiProperty({ example: false })
  isQuiz: boolean;

  @Type(() => CreatePollAnswerOptionDto)
  @ValidateNested({ each: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(10)
  @ApiProperty({
    type: [CreatePollAnswerOptionDto],
    example: pollAnswerOptionsExample,
  })
  answerOptions: CreatePollAnswerOptionDto[];
}
