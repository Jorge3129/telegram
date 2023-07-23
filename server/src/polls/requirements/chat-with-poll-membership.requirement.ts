import { Injectable } from '@nestjs/common';
import { PollsQueryService } from '../poll-services/polls-query.service';

@Injectable()
export class ChatWithPollMembershipRequirement {
  constructor(private pollsQueryService: PollsQueryService) {}

  public async validate(userId: number, pollId: string): Promise<boolean> {
    const result = await this.pollsQueryService.isUserMemberOfChatsWithPoll(
      userId,
      pollId,
    );

    return result;
  }
}
