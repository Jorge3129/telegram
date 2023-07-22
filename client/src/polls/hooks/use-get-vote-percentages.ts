import _ from "lodash";
import { Poll } from "../models/poll.model";
import { useMemo } from "react";

export const useGetVotePercentage = (poll: Poll) => {
  const votePercentagesById = useMemo(
    () => _.groupBy(poll.votesPercentages, "answerOptionId"),
    [poll.votesPercentages]
  );

  const getVotesPercentage = (optionId: string): number => {
    const record = votePercentagesById[optionId];

    return record ? record[0].votesPercentage : 0;
  };

  return getVotesPercentage;
};
