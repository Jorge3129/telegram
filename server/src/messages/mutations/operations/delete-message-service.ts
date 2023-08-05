import { Injectable } from '@nestjs/common';
import { MessageMutationRepository } from '../message-mutation.repository';
import { MessageQueryRepository } from '../../queries/message-query.repository';
import { MessageEntity } from '../../entity/message.entity';
import { DeleteMessageRequirement } from '../../requirements/delete-message.requirement';
import { UserEntity } from '../../../users/entity/user.entity';

@Injectable()
export class DeleteMessageService {
  constructor(
    private messageRepo: MessageMutationRepository,
    private deleteMessageRequirement: DeleteMessageRequirement,
    private messageQueryRepo: MessageQueryRepository,
  ) {}

  public async delete(
    messageId: string,
    user: UserEntity,
  ): Promise<MessageEntity> {
    const message = await this.messageQueryRepo.findOneByOrFail({
      id: messageId,
    });

    await this.deleteMessageRequirement.validate(message, user);

    await this.messageRepo.delete(messageId);

    return message;
  }
}
