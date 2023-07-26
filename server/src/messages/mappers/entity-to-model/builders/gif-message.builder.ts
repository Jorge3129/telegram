import { Injectable } from '@nestjs/common';
import { GifContentEntity } from '../../../entity/message-content/message-content.entity';
import { BaseMessage, GifMessage } from '../../../models/message.type';

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
