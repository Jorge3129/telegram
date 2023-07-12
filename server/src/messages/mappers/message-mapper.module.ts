import { Provider } from '@nestjs/common';
import { GifMessageBuilder } from './entity-to-model/builders/gif-message.builder';
import { TextMessageBuilder } from './entity-to-model/builders/text-message-builder';
import { MessageEntityToModelMapper } from './entity-to-model/message-entity-to-model.mapper';
import { BaseMessageBuilder } from './entity-to-model/builders/base-message.builder';
import { TextMessageContentBuilder } from './dto-to-entity/builders/text-message-content.builder';
import { MediaMessageContentBuilder } from './dto-to-entity/builders/media-message-content.builder';
import { GifMessageContentBuilder } from './dto-to-entity/builders/gif-message-content.builder';
import { MessageDtoToEntityMapper } from './dto-to-entity/message-dto-to-entity.mapper';
import { MessageMappingHelper } from './entity-to-model/message-mapping.helper';

export class MessageMapperModule {
  public static get providers(): Provider[] {
    return [...this.dtoToEntityProviders, ...this.entityToModelProviders];
  }

  private static get entityToModelProviders(): Provider[] {
    return [
      BaseMessageBuilder,
      GifMessageBuilder,
      TextMessageBuilder,
      MessageEntityToModelMapper,
      MessageMappingHelper,
    ];
  }

  private static get dtoToEntityProviders(): Provider[] {
    return [
      TextMessageContentBuilder,
      MediaMessageContentBuilder,
      GifMessageContentBuilder,
      MessageDtoToEntityMapper,
    ];
  }
}
