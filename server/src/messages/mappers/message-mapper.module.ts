import { Provider } from '@nestjs/common';
import { GifMessageBuilder } from './entity-to-model/builders/gif-message.builder';
import { TextMessageBuilder } from './entity-to-model/builders/text-message-builder';
import { MessageEntityToModelMapper } from './entity-to-model/message-entity-to-model.mapper';
import { BaseMessageBuilder } from './entity-to-model/builders/base-message.builder';

export class MessageMapperModule {
  public static get providers(): Provider[] {
    return [
      BaseMessageBuilder,
      GifMessageBuilder,
      TextMessageBuilder,
      MessageEntityToModelMapper,
    ];
  }
}
