import { Injectable } from '@nestjs/common';
import { CreateTextMessageDto } from 'src/messages/dto/create-message/create-text-message.dto';
import { TextMessageContentEntity } from 'src/messages/entity/message-content/message-content.entity';

@Injectable()
export class TextMessageContentBuilder {
  public build(dto: CreateTextMessageDto): TextMessageContentEntity {
    const textContent = new TextMessageContentEntity();
    textContent.textContent = dto.text;

    return textContent;
  }
}
