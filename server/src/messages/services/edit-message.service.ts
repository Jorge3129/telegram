import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MessagesRepository } from './message.repository';
import { MessagesGateway } from 'src/socket/messages.gateway';
import { EditMessageDto } from '../dto/edit-message.dto';
import { User } from 'src/users/user.type';

@Injectable()
export class EditMessageService {
  constructor(
    private messageRepo: MessagesRepository,
    private messagesGateway: MessagesGateway,
  ) {}

  public async editMessage(
    messageId: string,
    dto: EditMessageDto,
    user: User,
  ): Promise<void> {
    const message = await this.messageRepo.findOneBy({ id: messageId });

    if (!message) {
      throw new NotFoundException('No message');
    }

    if (message.author.id !== user.id) {
      throw new ForbiddenException('Cannot edit this message');
    }

    await this.messageRepo.updateMessageText(message, dto.textContent);

    await this.messagesGateway.sendMessageToRecipients(
      message.chatId,
      user.id,
      'message-edit',
      {
        messageId,
        chatId: message.chatId,
        text: dto.textContent,
      },
    );
  }
}
