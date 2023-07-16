import { Body, Controller, Param, Post } from '@nestjs/common';
import { VotesMutationService } from './votes/votes-mutation.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateVotesDto } from './dto/create-votes/create-votes.dto';
import { RequestUser } from 'src/users/decorators/user.decorator';
import { UserEntity } from 'src/users/entity/user.entity';

@ApiTags('Polls')
@Controller('polls')
export class PollVotesController {
  constructor(private votesMutationService: VotesMutationService) {}

  @Post(':pollId/votes')
  @ApiBearerAuth()
  public vote(
    @Param('pollId') pollId: string,
    @Body() dto: CreateVotesDto,
    @RequestUser() user: UserEntity,
  ) {
    return this.votesMutationService.vote(
      pollId,
      dto.chosenAnswerOptions,
      user,
    );
  }
}
