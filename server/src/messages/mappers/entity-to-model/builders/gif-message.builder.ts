import { Injectable } from '@nestjs/common';
import { GifContentEntity } from 'src/messages/entity/message-content/message-content.entity';
import { MessageEntity } from 'src/messages/entity/message.entity';
import { GifMessage } from 'src/messages/models/message.type';
import { BaseMessageBuilder } from './base-message.builder';

@Injectable()
export class GifMessageBuilder {
  constructor(private baseMessageBuilder: BaseMessageBuilder) {}

  public build(message: MessageEntity, content: GifContentEntity): GifMessage {
    return {
      type: 'gif-message',
      srcObject: content.srcObject,
      ...this.baseMessageBuilder.build(message),
    };
  }
}
