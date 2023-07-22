import { BasicUser } from "../../users/models/user.model";

export type PollUserVote = BasicUser & { optionId: string };

export type PollAnswerOptionWithUsers = {
  optionId: string;
  votedUsers: PollUserVote[];
};
