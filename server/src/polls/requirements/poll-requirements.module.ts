import { Provider } from '@nestjs/common';
import { CreateVoteRequirement } from '../votes/requirements/create-vote-requirement';
import { RetractVoteRequirement } from '../votes/requirements/retract-vote-requirement';
import { UserHasVotedInPollRequirement } from '../votes/requirements/user-has-voted-in-poll.requirement';
import { ChatWithPollMembershipRequirement } from './chat-with-poll-membership.requirement';

export class PollRequirementsModule {
  public static get providers(): Provider[] {
    return [
      CreateVoteRequirement,
      RetractVoteRequirement,
      ChatWithPollMembershipRequirement,
      UserHasVotedInPollRequirement,
    ];
  }
}
