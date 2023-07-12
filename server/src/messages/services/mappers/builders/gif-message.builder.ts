import { Injectable } from '@nestjs/common';
import { GifContentEntity } from 'src/messages/entity/message-content.entity';
import { MessageEntity } from 'src/messages/entity/message.entity';
import { GifMessage } from 'src/messages/models/message.type';
import { MessageMappingHelper } from '../message-mapping.helper';

@Injectable()
export class GifMessageBuilder {
  constructor(private messageHelper: MessageMappingHelper) {}

  public build(message: MessageEntity, content: GifContentEntity): GifMessage {
    return {
      type: 'gif-message',
      srcObject: content.srcObject,
      ...this.messageHelper.getBaseMessage(message),
    };
  }
}
