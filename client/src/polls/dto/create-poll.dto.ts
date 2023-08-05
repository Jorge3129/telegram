export interface CreatePollAnswerOptionDto {
  text: string;
  isCorrectOption?: boolean;
}

export interface CreatePollDto {
  question: string;
  isAnonymous: boolean;
  isMultipleChoice: boolean;
  isQuiz: boolean;
  answerOptions: CreatePollAnswerOptionDto[];
}
