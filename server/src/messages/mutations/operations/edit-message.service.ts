import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MessageMutationRepository } from '../message-mutation.repository';
import { EditMessageDto } from '../../dto/edit-message.dto';
import { User } from 'src/users/user.type';
import { MessageQueryRepository } from '../../queries/message-query.repository';
import { MessageEntity } from 'src/messages/entity/message.entity';

@Injectable()
export class EditMessageService {
  constructor(
    private messageRepo: MessageMutationRepository,
    private messageQueryRepo: MessageQueryRepository,
  ) {}

  public async editMessage(
    messageId: string,
    dto: EditMessageDto,
    user: User,
  ): Promise<MessageEntity> {
    const message = await this.messageQueryRepo.findOneBy({ id: messageId });

    if (!message) {
      throw new NotFoundException('No message');
    }

    if (message.author.id !== user.id) {
      throw new ForbiddenException('Cannot edit this message');
    }

    await this.messageRepo.updateMessageText(message, dto.textContent);

    return message;
  }
}
