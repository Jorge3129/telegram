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

@Module({
  imports: [TypeOrmModule.forFeature([PollVoteEntity])],
  controllers: [PollsController, PollVotesController],
  providers: [
    ...PollMappersModule.providers,
    VotesMutationService,
    VotesQueryService,
    PollsQueryService,
    CreateVoteRequirement,
  ],
  exports: [...PollMappersModule.providers],
})
export class PollsModule {}
