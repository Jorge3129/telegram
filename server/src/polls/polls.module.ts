import { Module } from '@nestjs/common';
import { PollsController } from './polls.controller';
import { VotesMutationService } from './votes/votes-mutation.service';
import { PollVotesController } from './poll-votes.controller';
import { VotesQueryService } from './votes/votes-query.service';
import { PollsQueryService } from './poll-services/polls-query.service';
import { CreateVoteRequirement } from './votes/requirements/create-vote-requirement';
import { PollDtoToEntityMapper } from './poll-services/poll-dto-to-entity.mapper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PollVoteEntity } from './entity/poll-vote.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PollVoteEntity])],
  controllers: [PollsController, PollVotesController],
  providers: [
    VotesMutationService,
    VotesQueryService,
    PollsQueryService,
    CreateVoteRequirement,
    PollDtoToEntityMapper,
  ],
  exports: [PollDtoToEntityMapper],
})
export class PollsModule {}
