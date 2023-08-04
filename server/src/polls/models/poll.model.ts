import { PollVotesPercentage } from './poll-votes-percentage.model';

export class PollAnswerOption {
  id: string;
  text: string;
  optionIndex: number;
}

export interface Poll {
  id: string;
  question: string;
  isAnonymous: boolean;
  isMultipleChoice: boolean;
  isQuiz: boolean;
  answerOptions: PollAnswerOption[];
  userSelectedOptionIds: string[];
  votesPercentages: PollVotesPercentage[];
  totalVotesCount: number;
}
