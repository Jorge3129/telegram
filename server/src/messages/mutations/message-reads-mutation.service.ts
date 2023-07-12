import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { MessageReadEntity } from '../entity/message-read.entity';
import { MessageEntity } from '../entity/message.entity';

@Injectable()
export class MessageReadsMutationService {
  constructor(private em: EntityManager) {}

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

      const values = messagesToUpdate.map(
        ({ messageId }): Partial<MessageReadEntity> => ({
          messageId,
          userId: readByUserId,
        }),
      );

      await tx.save(MessageReadEntity, values).catch((e) => {
        console.log(e);
      });
    });
  }
}
