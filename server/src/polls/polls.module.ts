import { Module } from '@nestjs/common';
import { PollsController } from './polls.controller';
import { VotesMutationService } from './votes/votes-mutation.service';
import { PollVotesController } from './poll-votes.controller';
import { VotesQueryService } from './votes/votes-query.service';
import { PollsQueryService } from './poll-services/polls-query.service';

@Module({
  controllers: [PollsController, PollVotesController],
  providers: [VotesMutationService, VotesQueryService, PollsQueryService],
})
export class PollsModule {}
