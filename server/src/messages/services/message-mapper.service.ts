import { Injectable } from '@nestjs/common';
import { MessageEntity } from '../entity/message.entity';
import { Message, TextMessage } from '../models/message.type';
import {
  MessageContentEntity,
  isMediaContent,
  isTextContent,
} from '../entity/message-content.entity';
import { Media } from '../models/media.type';

@Injectable()
export class MessageMapperService {
  public mapEntityToModel(entity: MessageEntity): Message {
    return this.createTextMessage(entity);
  }

  private createTextMessage(message: MessageEntity): TextMessage {
    return {
      type: 'text-message',
      id: message.id,
      timestamp: message.timestamp,
      author: message.author,
      authorId: message.authorId,
      authorName: message.author.username,
      chatId: message.chatId,
      edited: message.edited,
      media: this.getMedia(message.content),
      text: this.getText(message.content),
      seen: this.getSeen(message),
    };
  }

  private getSeen(message: MessageEntity): boolean {
    return !!message.reads?.find((read) => read.userId !== message.authorId);
  }

  private getMedia(content: MessageContentEntity): Media[] {
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

  private getText(content: MessageContentEntity): string {
    if (isMediaContent(content)) {
      return content.textContent ?? '';
    }

    if (isTextContent(content)) {
      return content.textContent;
    }

    return '';
  }
}
