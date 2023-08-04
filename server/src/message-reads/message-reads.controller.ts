import { Controller, Post, Param } from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { RequestUser } from '../users/decorators/user.decorator';
import { UserEntity } from '../users/entity/user.entity';
import { MessageReadsService } from './message-reads.service';

@ApiTags('MessageReads')
@Controller('messages')
export class MessageReadsController {
  constructor(private messageReadsService: MessageReadsService) {}

  @Post(':messageId/reads')
  @ApiBearerAuth()
  public async updateMessageReads(
    @Param('messageId') messageId: string,
    @RequestUser() user: UserEntity,
  ) {
    await this.messageReadsService.readMessage(messageId, user);
  }
}
