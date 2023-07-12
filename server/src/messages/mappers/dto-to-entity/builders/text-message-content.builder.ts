import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from 'src/messages/dto/create-message.dto';
import { TextMessageContentEntity } from 'src/messages/entity/message-content.entity';

@Injectable()
export class TextMessageContentBuilder {
  public build(dto: CreateMessageDto): TextMessageContentEntity {
    const textContent = new TextMessageContentEntity();
    textContent.textContent = dto.text;

    return textContent;
  }
}
