import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MessageMutationRepository } from '../message-mutation.repository';
import { MessageQueryRepository } from '../../queries/message-query.repository';
import { MessageEntity } from '../../entity/message.entity';
import { User } from '../../../users/user.type';

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
