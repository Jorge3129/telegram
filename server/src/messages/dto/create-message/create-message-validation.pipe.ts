import { CreateMessageDto } from './create-message.dto';
import { plainToInstance } from 'class-transformer';
import { CreateTextMessageDto } from './create-text-message.dto';
import { CreateGifMessageDto } from './create-gif-message.dto';
import { CreatePollMessageDto } from './create-poll-message.dto';
import { BaseUnionValidationPipe } from '../../../shared/pipes/base-union-validation.pipe';

export class CreateMessageValidationPipe extends BaseUnionValidationPipe<CreateMessageDto> {
  protected async createInstance(
    payload: CreateMessageDto,
  ): Promise<CreateMessageDto> {
    if (payload.type === 'gif') {
      return plainToInstance(CreateGifMessageDto, payload);
    }

    if (payload.type === 'poll') {
      return plainToInstance(CreatePollMessageDto, payload);
    }

    return plainToInstance(CreateTextMessageDto, payload);
  }
}
