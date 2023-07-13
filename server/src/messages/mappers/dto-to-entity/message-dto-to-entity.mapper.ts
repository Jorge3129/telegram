import { Injectable } from '@nestjs/common';
import {
  MessageEntity,
  PersonalMessageEntity,
} from '../../entity/message.entity';
import { MessageContentEntity } from '../../entity/message-content.entity';
import { CreateGifMessageDto } from 'src/messages/dto/create-message/create-gif-message.dto';
import { User } from 'src/users/user.type';
import { GifMessageContentBuilder } from './builders/gif-message-content.builder';
import { TextMessageContentBuilder } from './builders/text-message-content.builder';
import { MediaMessageContentBuilder } from './builders/media-message-content.builder';
import { CreateMessageDto } from 'src/messages/dto/create-message/create-message.dto';

@Injectable()
export class MessageDtoToEntityMapper {
  constructor(
    private gifContentBuilder: GifMessageContentBuilder,
    private textContentBuilder: TextMessageContentBuilder,
    private mediaContentBuilder: MediaMessageContentBuilder,
  ) {}

  public mapDtoToEntity(dto: CreateMessageDto, user: User): MessageEntity {
    const message = new PersonalMessageEntity();
    message.authorId = user.id;
    message.chatId = dto.chatId;
    message.content = this.createMessageContent(dto);
    message.timestamp = dto.timestamp;

    return message;
  }

  private createMessageContent(dto: CreateMessageDto): MessageContentEntity {
    if (dto instanceof CreateGifMessageDto) {
      return this.gifContentBuilder.build(dto);
    }

    if (!dto.media?.filename) {
      return this.textContentBuilder.build(dto);
    }

    return this.mediaContentBuilder.build(dto, dto.media);
  }
}
