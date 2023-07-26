import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { RetractVoteRequirement } from '../requirements/retract-vote-requirement';
import { UserEntity } from '../../../users/entity/user.entity';
import { PollVoteEntity } from '../../entity/poll-vote.entity';
import { PollEntity } from '../../entity/poll.entity';

@Injectable()
export class RetractVoteService {
  constructor(
    private entityManager: EntityManager,
    private retractVoteRequirement: RetractVoteRequirement,
  ) {}

  public async retractVotes(poll: PollEntity, user: UserEntity): Promise<void> {
    await this.retractVoteRequirement.validate(poll, user);

    await this.deleteVotes(poll.id, user.id);
  }

  private async deleteVotes(pollId: string, userId: number) {
    await this.entityManager.transaction(async (tx) => {
      const votes = await tx.find(PollVoteEntity, {
        where: {
          answerOption: {
            pollId,
          },
          userId,
        },
      });

      await tx.remove(votes);
    });
  }
}
