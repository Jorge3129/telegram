import { CreateGifMessageDto } from './create-gif-message.dto';
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
};
