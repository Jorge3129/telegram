import _ from "lodash";
import { Poll } from "../models/poll.model";
import { useCallback, useMemo } from "react";

export const useGetVotePercentage = (poll: Poll) => {
  const votePercentagesById = useMemo(
    () => _.keyBy(poll.votesPercentages, "answerOptionId"),
    [poll.votesPercentages]
  );

  const getVotesPercentage = useCallback(
    (optionId: string): number => {
      const record = votePercentagesById[optionId];

      return record?.votesPercentage ?? 0;
    },
    [votePercentagesById]
  );

  return getVotesPercentage;
};
