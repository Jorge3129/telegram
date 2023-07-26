import _ from "lodash";
import { Poll } from "../models/poll.model";
import { useCallback, useMemo } from "react";

export const useGetVotes = (poll: Poll) => {
  const groupedVotes = useMemo(
    () => _.keyBy(poll.answerOptionsWithUsers, "optionId"),
    [poll.answerOptionsWithUsers]
  );

  const getVotes = useCallback(
    (optionId: string) => {
      return groupedVotes[optionId]?.votedUsers ?? [];
    },
    [groupedVotes]
  );

  return getVotes;
};
