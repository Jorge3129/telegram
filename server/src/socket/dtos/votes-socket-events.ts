import { PollVotesPercentage } from 'src/polls/models/poll-votes-percentage.model';
import { User } from 'src/users/user.type';

export enum VotesSocketEvents {
  NEW = 'vote.new',
  RETRACT = 'vote.retract',
}

export interface NewVoteSocketPayload {
  messageId: string;
  chatId: number;
  pollId: string;
  selectedAnswerOptionIds: string[];
  user: User;
  votePercentages: PollVotesPercentage[];
}

export interface RetractVoteSocketPayload {
  messageId: string;
  chatId: number;
  pollId: string;
  user: User;
  votePercentages: PollVotesPercentage[];
}
