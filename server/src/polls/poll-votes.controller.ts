import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { VotesMutationService } from './votes/votes-mutation.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateVotesDto } from './dto/create-votes/create-votes.dto';
import { RequestUser } from 'src/users/decorators/user.decorator';
import { UserEntity } from 'src/users/entity/user.entity';
import { VotesQueryService } from './votes/votes-query.service';
import { PollVotesPercentage } from './models/poll-votes-percentage.model';
import { PollAnswerOptionWithUsers } from './votes/queries/get-poll-vote-users.query';

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
  ): Promise<PollVotesPercentage[]> {
    // TODO check user has access to poll

    return this.votesQueryService.countVotePercentages(pollId);
  }

  @Get(':pollId/votes/results')
  @ApiBearerAuth()
  public getPollVoteResults(
    @Param('pollId') pollId: string,
    // @RequestUser() user: UserEntity,
  ): Promise<PollAnswerOptionWithUsers[]> {
    // TODO check user has access to poll

    return this.votesQueryService.getPollVotedUsers(pollId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':pollId/votes')
  @ApiBearerAuth()
  public retractVotes(
    @Param('pollId') pollId: string,
    @RequestUser() user: UserEntity,
  ) {
    return this.votesMutationService.retractVotes(pollId, user);
  }
}
