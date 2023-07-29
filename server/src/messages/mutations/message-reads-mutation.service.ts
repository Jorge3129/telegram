import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { MessageReadEntity } from '../entity/message-read.entity';
import { MessageEntity } from '../entity/message.entity';
import { AppLoggerService } from '../../logging/app-logger.service';

@Injectable()
export class MessageReadsMutationService {
  constructor(private em: EntityManager, private logger: AppLoggerService) {
    this.logger.setContext(MessageReadsMutationService.name);
  }

  public async updateSeen(
    readByUserId: number,
    message: {
      chatId: number;
      timestamp: string;
    },
  ): Promise<void> {
    await this.em.transaction(async (tx) => {
      const qb = tx
        .createQueryBuilder()
        .from(MessageEntity, 'message')
        .leftJoin(
          'message.reads',
          'readsByUser',
          '"readsByUser"."messageId" = message.id AND "readsByUser"."userId" = :readByUserId',
          { readByUserId },
        )
        .where('message.chatId = :chatId', { chatId: message.chatId })
        .andWhere('message.timestamp <= :timestamp', {
          timestamp: new Date(message.timestamp),
        })
        .andWhere('readsByUser.id IS NULL')
        .select(`message.id AS "messageId"`);

      const messagesToUpdate = await qb.getRawMany<{ messageId: string }>();

      this.logger.debug(messagesToUpdate.map((m) => m.messageId));

      const values = messagesToUpdate.map(
        ({ messageId }): Partial<MessageReadEntity> => ({
          messageId,
          userId: readByUserId,
        }),
      );

      await tx.save(MessageReadEntity, values).catch((e) => {
        this.logger.error(e.message);
      });
    });
  }
}
