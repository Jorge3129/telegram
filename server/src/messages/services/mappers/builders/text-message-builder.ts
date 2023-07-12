import { Injectable } from '@nestjs/common';
import {
  MediaMessageContentEntity,
  TextMessageContentEntity,
  isMediaContent,
} from 'src/messages/entity/message-content.entity';
import { MessageEntity } from 'src/messages/entity/message.entity';
import { Media } from 'src/messages/models/media.type';
import { TextMessage } from 'src/messages/models/message.type';
import { MessageMappingHelper } from '../message-mapping.helper';

@Injectable()
export class TextMessageBuilder {
  constructor(private messageHelper: MessageMappingHelper) {}

  public build(
    message: MessageEntity,
    content: TextMessageContentEntity | MediaMessageContentEntity,
  ): TextMessage {
    return {
      type: 'text-message',
      edited: message.edited,
      media: this.getMedia(content),
      text: this.getText(content),
      ...this.messageHelper.getBaseMessage(message),
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
