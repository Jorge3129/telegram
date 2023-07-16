import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsUUID } from 'class-validator';

export class CreateVotesDto {
  @IsUUID('4', { each: true })
  @ArrayMinSize(1)
  @ApiProperty({ type: 'string', isArray: true })
  chosenAnswerOptions: string[];
}
