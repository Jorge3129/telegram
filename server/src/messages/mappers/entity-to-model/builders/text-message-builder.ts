import { Injectable } from '@nestjs/common';
import {
  MediaMessageContentEntity,
  TextMessageContentEntity,
} from 'src/messages/entity/message-content/message-content.entity';
import { MessageEntity } from 'src/messages/entity/message.entity';
import { Media } from 'src/messages/models/media.type';
import { BaseMessage, TextMessage } from 'src/messages/models/message.type';
import { BaseMessageBuilder } from './base-message.builder';
import { isMediaContent } from '../../../entity/message-content/message-content.type-guards';

@Injectable()
export class TextMessageBuilder {
  constructor(private baseMessageBuilder: BaseMessageBuilder) {}

  public build(
    baseMessage: BaseMessage,
    message: MessageEntity,
    content: TextMessageContentEntity | MediaMessageContentEntity,
  ): TextMessage {
    return {
      type: 'text-message',
      edited: message.edited,
      media: this.getMedia(content),
      text: this.getText(content),
      ...baseMessage,
    };
  }

  private getMedia(
    content: TextMessageContentEntity | MediaMessageContentEntity,
  ): Media[] {
    if (!isMediaContent(content)) {
      return [];
    }

    const firstFile = content.media[0];

    return [
      {
        filename: firstFile.fileName,
        type: firstFile.mimeType,
      },
    ];
  }

  private getText(
    content: TextMessageContentEntity | MediaMessageContentEntity,
  ): string {
    if (isMediaContent(content)) {
      return content.textContent ?? '';
    }

    return content.textContent;
  }
}
