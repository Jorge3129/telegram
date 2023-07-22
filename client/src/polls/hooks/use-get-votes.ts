import _ from "lodash";
import { Poll } from "../models/poll.model";
import { useMemo } from "react";

export const useGetVotes = (poll: Poll) => {
  const groupedVotes = useMemo(
    () => _.groupBy(poll.answerOptionsWithUsers, "optionId"),
    [poll.answerOptionsWithUsers]
  );

  const getVotes = (optionId: string) => {
    return groupedVotes[optionId]?.at(0)?.votedUsers || [];
  };

  return getVotes;
};
