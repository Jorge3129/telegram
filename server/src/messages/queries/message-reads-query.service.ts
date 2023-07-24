import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { MessageReadEntity } from '../entity/message-read.entity';
import { MessageEntity } from '../entity/message.entity';

@Injectable()
export class MessageReadsQueryService {
  constructor(private em: EntityManager) {}

  // TODO refactor to 'count all messages since the latest sent by user'
  public async countUnreadMessages(
    chatId: number,
    userId: number,
  ): Promise<number> {
    const count = await this.em.transaction(async (tx) => {
      const latestReadSubQuery = tx
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
        .andWhere(
          `message.timestamp > COALESCE((${latestReadSubQuery.getQuery()}), '1970-01-01')`,
        )
        .andWhere('read.id IS NULL')
        .setParameters(latestReadSubQuery.getParameters())
        .getCount();
    });

    return count;
  }
}
