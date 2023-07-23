import { Module } from '@nestjs/common';
import { PollsController } from './polls.controller';
import { VotesMutationService } from './votes/votes-mutation.service';
import { PollVotesController } from './poll-votes.controller';
import { VotesQueryService } from './votes/votes-query.service';
import { PollsQueryService } from './poll-services/polls-query.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PollVoteEntity } from './entity/poll-vote.entity';
import { PollMappersModule } from './mappers/poll-mappers.module';
import { VoteQueriesModule } from './votes/queries/vote-queries.module';
import { PollRequirementsModule } from './requirements/poll-requirements.module';

@Module({
  imports: [TypeOrmModule.forFeature([PollVoteEntity])],
  controllers: [PollsController, PollVotesController],
  providers: [
    ...PollMappersModule.providers,
    ...VoteQueriesModule.providers,
    ...PollRequirementsModule.providers,
    VotesMutationService,
    VotesQueryService,
    PollsQueryService,
  ],
  exports: [
    ...PollMappersModule.providers,
    PollsQueryService,
    VotesQueryService,
  ],
})
export class PollsModule {}
