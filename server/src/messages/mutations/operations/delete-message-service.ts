import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MessageMutationRepository } from '../message-mutation.repository';
import { User } from 'src/users/user.type';
import { MessageQueryRepository } from '../../queries/message-query.repository';
import { MessageEntity } from 'src/messages/entity/message.entity';

@Injectable()
export class DeleteMessageService {
  constructor(
    private messageRepo: MessageMutationRepository,
    private messageQueryRepo: MessageQueryRepository,
  ) {}

  public async delete(messageId: string, user: User): Promise<MessageEntity> {
    const message = await this.messageQueryRepo.findOneBy({ id: messageId });

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    if (message.authorId !== user.id) {
      throw new ForbiddenException('Cannot delete this message');
    }

    await this.messageRepo.delete(messageId);

    return message;
  }
}
