import { Injectable } from '@nestjs/common';
import { CreateGifMessageDto } from 'src/messages/dto/create-message/create-gif-message.dto';
import { GifContentEntity } from 'src/messages/entity/message-content/message-content.entity';

@Injectable()
export class GifMessageContentBuilder {
  public build(dto: CreateGifMessageDto): GifContentEntity {
    const gifContent = new GifContentEntity();
    gifContent.srcObject = dto.srcObject;
    return gifContent;
  }
}
