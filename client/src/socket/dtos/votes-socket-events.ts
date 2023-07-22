import { PollVotePercentage } from "../../polls/models/poll-vote-percentage";
import { User } from "../../users/models/user.model";

export enum VotesSocketEvents {
  NEW = "vote.new",
  RETRACT = "vote.retract",
}

export interface NewVoteSocketPayload {
  messageId: string;
  chatId: number;
  pollId: string;
  selectedAnswerOptionIds: string[];
  user: User;
  votePercentages: PollVotePercentage[];
}

export interface RetractVoteSocketPayload {
  messageId: string;
  pollId: string;
  user: User;
  chatId: number;
  votePercentages: PollVotePercentage[];
}
