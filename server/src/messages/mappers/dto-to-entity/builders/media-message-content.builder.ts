import { Injectable } from '@nestjs/common';
import { CreateTextMessageDto } from 'src/messages/dto/create-message/create-text-message.dto';
import { MediaEntity } from 'src/messages/entity/media.entity';
import { MediaMessageContentEntity } from 'src/messages/entity/message-content.entity';
import { Media } from 'src/messages/models/media.type';

@Injectable()
export class MediaMessageContentBuilder {
  public build(
    dto: CreateTextMessageDto,
    dtoMedia: Media,
  ): MediaMessageContentEntity {
    const media = new MediaEntity();
    media.fileName = dtoMedia.filename;
    media.mimeType = dtoMedia.type;

    const mediaContent = new MediaMessageContentEntity();
    mediaContent.media = [media];
    mediaContent.textContent = dto.text;

    return mediaContent;
  }
}
