import { Injectable } from '@nestjs/common';
import { MessageMutationRepository } from '../message-mutation.repository';
import { EditMessageDto } from '../../dto/edit-message.dto';
import { MessageQueryRepository } from '../../queries/message-query.repository';
import { MessageEntity } from '../../entity/message.entity';
import { EdiMessageRequirement } from '../../requirements/edit-message.requirement';
import { UserEntity } from '../../../users/entity/user.entity';

@Injectable()
export class EditMessageService {
  constructor(
    private messageRepo: MessageMutationRepository,
    private messageQueryRepo: MessageQueryRepository,
    private editMessageRequirement: EdiMessageRequirement,
  ) {}

  public async editMessage(
    messageId: string,
    dto: EditMessageDto,
    currentUser: UserEntity,
  ): Promise<MessageEntity> {
    const message = await this.messageQueryRepo.findOneByOrFail({
      id: messageId,
    });

    await this.editMessageRequirement.validate(message, currentUser);

    await this.messageRepo.updateMessageText(message, dto.textContent);

    return message;
  }
}
