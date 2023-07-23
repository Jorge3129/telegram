import { Provider } from '@nestjs/common';
import { CreateVoteService } from './create-vote.service';
import { RetractVoteService } from './retract-vote.service';

export class VotesOperationsModule {
  public static get providers(): Provider[] {
    return [CreateVoteService, RetractVoteService];
  }
}
