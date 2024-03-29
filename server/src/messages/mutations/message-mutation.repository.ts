import { EntityManager, Repository } from 'typeorm';
import { MessageEntity } from '../entity/message.entity';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TextMessageContentEntity } from '../entity/message-content/message-content.entity';

@Injectable()
export class MessageMutationRepository {
  constructor(
    @InjectRepository(MessageEntity)
    private messageRepo: Repository<MessageEntity>,
    private entityManager: EntityManager,
  ) {}

  public save(dto: Partial<MessageEntity>): Promise<MessageEntity> {
    return this.messageRepo.save({ ...dto });
  }

  public async delete(messageId: string): Promise<void> {
    await this.entityManager.delete(MessageEntity, messageId);
  }

  public async updateMessageText(
    message: MessageEntity,
    textContent: string,
  ): Promise<void> {
    await this.entityManager.transaction(async (tx) => {
      await tx.update(TextMessageContentEntity, message.content.id, {
        textContent,
      });

      await tx.update(MessageEntity, message.id, {
        edited: true,
      });
    });
  }
}
