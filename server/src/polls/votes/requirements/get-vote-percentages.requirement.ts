import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { RequirementValidator } from '../../../shared/services/requirements/requirement.validator';
import { RequirementConfig } from '../../../shared/services/requirements/requirement-config';
import { PollEntity } from '../../entity/poll.entity';
import { UserHasVotedInPollRequirement } from './user-has-voted-in-poll.requirement';
import { UserEntity } from '../../../users/entity/user.entity';
import { ChatWithPollMembershipRequirement } from '../../requirements/chat-with-poll-membership.requirement';

@Injectable()
export class GetVotePercentagesRequirement {
  constructor(
    private validator: RequirementValidator,
    private chatWithPollMembership: ChatWithPollMembershipRequirement,
    private userHasVotedRequirement: UserHasVotedInPollRequirement,
  ) {}

  public validate(poll: PollEntity, currentUser: UserEntity) {
    const requirements: RequirementConfig[] = [
      ...this.getAccessRequirements(poll, currentUser),
    ];

    return this.validator.validate(
      requirements,
      (message) => new BadRequestException(message),
    );
  }

  private getAccessRequirements(
    poll: PollEntity,
    user: UserEntity,
  ): RequirementConfig[] {
    const requirements: RequirementConfig[] = [
      {
        check: this.chatWithPollMembership.validate(user.id, poll.id),
        errMessage: 'User is not member of any chat with this poll',
      },
      {
        check: this.userHasVotedRequirement.validate(user.id, poll.id),
        errMessage: 'User has not voted in this poll',
      },
    ];

    return requirements.map((config) => ({
      ...config,
      err: (message) => new ForbiddenException(message),
    }));
  }
}
