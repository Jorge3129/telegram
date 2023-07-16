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
}
