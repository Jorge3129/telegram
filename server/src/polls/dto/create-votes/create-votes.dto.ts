import { ApiProperty } from '@nestjs/swagger';
import { IsString, ArrayMinSize } from 'class-validator';

export class CreateVotesDto {
  @IsString({ each: true })
  @ArrayMinSize(1)
  @ApiProperty({ type: 'string', isArray: true })
  chosenAnswerOptions: string[];
}
