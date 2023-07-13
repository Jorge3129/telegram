import { BaseUnionValidationPipe } from 'src/shared/pipes/base-union-validation.pipe';
import { CreateMessageDto } from './create-message.dto';
import { plainToInstance } from 'class-transformer';
import { CreateTextMessageDto } from './create-text-message.dto';
import { CreateGifMessageDto } from './create-gif-message.dto';

export class CreateMessageValidationPipe extends BaseUnionValidationPipe<CreateMessageDto> {
  protected async createInstance(
    payload: CreateMessageDto,
  ): Promise<CreateMessageDto> {
    if (payload.type === 'gif') {
      return plainToInstance(CreateGifMessageDto, payload);
    }

    return plainToInstance(CreateTextMessageDto, payload);
  }
}
