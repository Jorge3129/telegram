import { Module } from '@nestjs/common';
import { PollsController } from './polls.controller';

@Module({
  controllers: [PollsController],
})
export class PollsModule {}
