import { refs } from '@nestjs/swagger';
import {
  ReferenceObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { CreateGifMessageDto } from './create-gif-message.dto';
import { CreateTextMessageDto } from './create-text-message.dto';
import { CreatePollMessageDto } from './create-poll-message.dto';

export const createMessageSchema: SchemaObject | ReferenceObject = {
  oneOf: refs(CreateTextMessageDto, CreateGifMessageDto, CreatePollMessageDto),
};
