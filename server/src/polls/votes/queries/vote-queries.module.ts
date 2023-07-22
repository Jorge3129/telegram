import { Provider } from '@nestjs/common';
import { CountTotalDistinctUserVotesQuery } from './count-total-distinct-user-votes.query';
import { CountVotePercentagesQuery } from './count-vote-percentages.query';
import { CountVotesByOptionQuery } from './count-votes-by-option-query';

export class VoteQueriesModule {
  public static get providers(): Provider[] {
    return [
      CountTotalDistinctUserVotesQuery,
      CountVotePercentagesQuery,
      CountVotesByOptionQuery,
    ];
  }
}
