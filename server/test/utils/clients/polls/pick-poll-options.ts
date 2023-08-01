import {
  Poll,
  PollAnswerOption,
} from '../../../../src/polls/models/poll.model';

export const pickPollOptions = (
  poll: Poll,
  selectedIndices: number[],
): PollAnswerOption[] => {
  return poll.answerOptions.filter((option) => {
    return selectedIndices.includes(option.optionIndex);
  });
};

export const pickPollOptionIds = (
  poll: Poll,
  selectedIndices: number[],
): string[] => {
  return pickPollOptions(poll, selectedIndices).map((option) => option.id);
};
