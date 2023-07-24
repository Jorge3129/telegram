import { Injectable } from '@nestjs/common';
import { GifContentEntity } from 'src/messages/entity/message-content/message-content.entity';
import { BaseMessage, GifMessage } from 'src/messages/models/message.type';

@Injectable()
export class GifMessageBuilder {
  public build(
    baseMessage: BaseMessage,
    content: GifContentEntity,
  ): GifMessage {
    return {
      type: 'gif-message',
      srcObject: content.srcObject,
      ...baseMessage,
    };
  }
}
