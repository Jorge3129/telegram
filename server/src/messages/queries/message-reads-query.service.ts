import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { MessageReadEntity } from '../entity/message-read.entity';
import { MessageEntity } from '../entity/message.entity';

@Injectable()
export class MessageReadsQueryService {
  constructor(private em: EntityManager) {}

  public async countUnreadMessages(
    chatId: number,
    userId: number,
  ): Promise<number> {
    const count = await this.em.transaction(async (tx) => {
      const latestReadSubquery = tx
        .createQueryBuilder()
        .from(MessageReadEntity, 'read')
        .innerJoin('read.message', 'message')
        .where('read.userId = :userId', { userId })
        .select('MAX(message.timestamp)', 'latestRead');

      return await tx
        .createQueryBuilder()
        .from(MessageEntity, 'message')
        .leftJoin(
          'message.reads',
          'read',
          'read.messageId = message.id AND read.userId = :userId',
          { userId },
        )
        .where('message.chatId = :chatId', { chatId })
        .andWhere('message.timestamp > (' + latestReadSubquery.getQuery() + ')')
        .andWhere('read.id IS NULL')
        .setParameters(latestReadSubquery.getParameters())
        .getCount();
    });

    return count;
  }
}
