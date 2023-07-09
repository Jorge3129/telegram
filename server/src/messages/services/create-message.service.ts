import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from '../dto/create-message.dto';
import { MediaEntity } from '../entity/media.entity';
import {
  MessageContentEntity,
  TextMessageContentEntity,
  MediaMessageContentEntity,
  GifContentEntity,
} from '../entity/message-content.entity';
import { MessageEntity, PersonalMessageEntity } from '../entity/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/users/user.repository';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.type';
import { CreateGifMessageDto } from '../dto/create-gif-message.dto';

@Injectable()
export class CreateMessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private messageRepo: Repository<MessageEntity>,

    @InjectRepository(MessageContentEntity)
    private messageContentRepo: Repository<MessageContentEntity>,

    private userRepo: UserRepository,
  ) {}

  public async saveFromDto(
    dto: CreateMessageDto | CreateGifMessageDto,
    user: User,
  ): Promise<MessageEntity> {
    const message = this.createMessage(dto, user);

    const content = await this.messageContentRepo.save(message.content);

    const savedMessage = await this.messageRepo.save({ ...message, content });

    savedMessage.author = await this.userRepo.findOneByOrFail({
      id: message.authorId,
    });

    return savedMessage;
  }

  private createMessage(
    dto: CreateMessageDto | CreateGifMessageDto,
    user: User,
  ): MessageEntity {
    const message = new PersonalMessageEntity();
    message.authorId = user.id;
    message.chatId = dto.chatId;
    message.content = this.createMessageContent(dto);
    message.timestamp = dto.timestamp;

    return message;
  }

  private createMessageContent(
    dto: CreateMessageDto | CreateGifMessageDto,
  ): MessageContentEntity {
    if (dto instanceof CreateGifMessageDto) {
      const gifContent = new GifContentEntity();
      gifContent.srcObject = dto.srcObject;
      return gifContent;
    }

    if (!dto.media?.filename) {
      const textContent = new TextMessageContentEntity();
      textContent.textContent = dto.text;

      return textContent;
    }

    const media = new MediaEntity();
    media.fileName = dto.media.filename;
    media.mimeType = dto.media.type;

    const mediaContent = new MediaMessageContentEntity();
    mediaContent.media = [media];
    mediaContent.textContent = dto.text;

    return mediaContent;
  }
}
