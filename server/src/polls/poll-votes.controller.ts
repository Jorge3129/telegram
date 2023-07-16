import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { VotesMutationService } from './votes/votes-mutation.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateVotesDto } from './dto/create-votes/create-votes.dto';
import { RequestUser } from 'src/users/decorators/user.decorator';
import { UserEntity } from 'src/users/entity/user.entity';
import { VotesQueryService } from './votes/votes-query.service';

@ApiTags('Polls')
@Controller('polls')
export class PollVotesController {
  constructor(
    private votesMutationService: VotesMutationService,
    private votesQueryService: VotesQueryService,
  ) {}

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

  @Get(':pollId/votes/count')
  @ApiBearerAuth()
  public getVoteCount(
    @Param('pollId') pollId: string,
    // @RequestUser() user: UserEntity,
  ) {
    // TODO check user has access to poll

    return this.votesQueryService.countVotes(pollId);
  }

  @Get(':pollId/votes/percentage')
  @ApiBearerAuth()
  public getVotePercentage(
    @Param('pollId') pollId: string,
    // @RequestUser() user: UserEntity,
  ) {
    // TODO check user has access to poll

    return this.votesQueryService.countVotePercentages(pollId);
  }
}
