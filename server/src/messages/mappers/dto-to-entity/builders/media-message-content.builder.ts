import { Injectable } from '@nestjs/common';
import { CreateTextMessageDto } from '../../../dto/create-message/create-text-message.dto';
import { MediaEntity } from '../../../entity/media.entity';
import { MediaMessageContentEntity } from '../../../entity/message-content/message-content.entity';
import { Media } from '../../../models/media.type';

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
