import { Module } from '@nestjs/common';
import { PollsController } from './polls.controller';
import { VotesMutationService } from './votes/votes-mutation.service';
import { PollVotesController } from './poll-votes.controller';
import { VotesQueryService } from './votes/votes-query.service';
import { PollsQueryService } from './poll-services/polls-query.service';
import { CreateVoteRequirement } from './votes/requirements/create-vote-requirement';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PollVoteEntity } from './entity/poll-vote.entity';
import { PollMappersModule } from './mappers/poll-mappers.module';
import { VoteQueriesModule } from './votes/queries/vote-queries.module';
import { ChatWithPollMembershipRequirement } from './requirements/chat-with-poll-membership.requirement';

@Module({
  imports: [TypeOrmModule.forFeature([PollVoteEntity])],
  controllers: [PollsController, PollVotesController],
  providers: [
    ...PollMappersModule.providers,
    ...VoteQueriesModule.providers,
    VotesMutationService,
    VotesQueryService,
    PollsQueryService,
    CreateVoteRequirement,
    ChatWithPollMembershipRequirement,
  ],
  exports: [
    ...PollMappersModule.providers,
    PollsQueryService,
    VotesQueryService,
  ],
})
export class PollsModule {}
