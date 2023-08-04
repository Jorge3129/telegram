import { Module } from '@nestjs/common';
import { MessageReadsController } from './message-reads.controller';
import { MessageReadsMutationService } from './mutations/message-reads-mutation.service';
import { MessageReadsService } from './message-reads.service';
import { MessageReadsQueryService } from './queries/message-reads-query.service';

@Module({
  providers: [
    MessageReadsMutationService,
    MessageReadsService,
    MessageReadsQueryService,
  ],
  exports: [MessageReadsQueryService, MessageReadsMutationService],
  controllers: [MessageReadsController],
})
export class MessageReadsModule {}
