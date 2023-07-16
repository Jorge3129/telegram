import { pollAnswerOptionsExample } from 'src/polls/dto/create-poll/poll-answer-options.example';
import { CreateGifMessageDto } from './create-gif-message.dto';
import { CreatePollMessageDto } from './create-poll-message.dto';
import { CreateTextMessageDto } from './create-text-message.dto';

export const createMessageDtoExamples: Record<string, { value: any }> = {
  [CreateTextMessageDto.name]: {
    value: <CreateTextMessageDto>{
      type: 'text',
      chatId: 1,
      text: 'hello',
      timestamp: new Date('2023-07-16').toISOString(),
    },
  },
  [CreateGifMessageDto.name]: {
    value: <CreateGifMessageDto>{
      type: 'gif',
      chatId: 1,
      srcObject: {},
      timestamp: new Date('2023-07-16').toISOString(),
    },
  },
  [CreatePollMessageDto.name]: {
    value: <CreatePollMessageDto>{
      type: 'poll',
      chatId: 1,
      timestamp: new Date('2023-07-16').toISOString(),
      poll: {
        isAnonymous: false,
        isMultipleChoice: false,
        isQuiz: false,
        question: 'How are you?',
        answerOptions: pollAnswerOptionsExample,
      },
    },
  },
};
