import { Injectable } from '@nestjs/common';
import { PollVoteEntity } from 'src/polls/entity/poll-vote.entity';
import { UserEntity } from 'src/users/entity/user.entity';
import { EntityManager } from 'typeorm';
import { PollEntity } from 'src/polls/entity/poll.entity';
import { RetractVoteRequirement } from '../requirements/retract-vote-requirement';

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
