import { PollAnswerOptionWithUsers } from "./poll-answer-option-with-user";
import { PollVotePercentage } from "./poll-vote-percentage";

export interface PollAnswerOption {
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
  votesPercentages?: PollVotePercentage[];
  answerOptionsWithUsers?: PollAnswerOptionWithUsers[];
}
