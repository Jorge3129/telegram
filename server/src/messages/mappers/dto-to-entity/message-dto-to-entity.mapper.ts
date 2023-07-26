import { Injectable } from '@nestjs/common';
import {
  ChannelPostEntity,
  GroupMessageEntity,
  MessageEntity,
  PersonalMessageEntity,
} from '../../entity/message.entity';
import { MessageContentEntity } from '../../entity/message-content/message-content.entity';
import { GifMessageContentBuilder } from './builders/gif-message-content.builder';
import { TextMessageContentBuilder } from './builders/text-message-content.builder';
import { MediaMessageContentBuilder } from './builders/media-message-content.builder';
import { PollMessageContentBuilder } from './builders/poll-message-content.builder';
import { ChatEntity, ChatType } from '../../../chats/entity/chat.entity';
import { User } from '../../../users/user.type';
import { CreateGifMessageDto } from '../../dto/create-message/create-gif-message.dto';
import { CreateMessageDto } from '../../dto/create-message/create-message.dto';
import { CreatePollMessageDto } from '../../dto/create-message/create-poll-message.dto';

@Injectable()
export class MessageDtoToEntityMapper {
  constructor(
    private gifContentBuilder: GifMessageContentBuilder,
    private textContentBuilder: TextMessageContentBuilder,
    private mediaContentBuilder: MediaMessageContentBuilder,
    private pollContentBuilder: PollMessageContentBuilder,
  ) {}

  public mapDtoToEntity(
    dto: CreateMessageDto,
    user: User,
    chat: ChatEntity,
  ): MessageEntity {
    const message = this.createMessageByChatType(chat.type);

    message.authorId = user.id;
    message.chatId = dto.chatId;
    message.content = this.createMessageContent(dto);
    message.timestamp = new Date().toISOString();

    return message;
  }

  private createMessageByChatType(chatType: ChatType): MessageEntity {
    if (chatType === ChatType.CHANNEL) {
      return new ChannelPostEntity();
    }

    if (chatType === ChatType.GROUP) {
      return new GroupMessageEntity();
    }

    return new PersonalMessageEntity();
  }

  private createMessageContent(dto: CreateMessageDto): MessageContentEntity {
    if (dto instanceof CreateGifMessageDto) {
      return this.gifContentBuilder.build(dto);
    }

    if (dto instanceof CreatePollMessageDto) {
      return this.pollContentBuilder.build(dto);
    }

    if (!dto.media?.filename) {
      return this.textContentBuilder.build(dto);
    }

    return this.mediaContentBuilder.build(dto, dto.media);
  }
}
