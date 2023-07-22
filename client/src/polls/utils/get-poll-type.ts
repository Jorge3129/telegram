import { Poll } from "../models/poll.model";

export const getPollType = (poll: Poll): string => {
  if (poll.isAnonymous) {
    return "Anonymous Poll";
  }

  if (poll.isQuiz) {
    return "Quiz";
  }

  return "Poll";
};
