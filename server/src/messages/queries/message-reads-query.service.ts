import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { MessageReadEntity } from '../entity/message-read.entity';
import { MessageEntity } from '../entity/message.entity';

@Injectable()
export class MessageReadsQueryService {
  constructor(private em: EntityManager) {}

  // TODO optimize to single query
  public async countUnreadMessages(
    chatId: number,
    userId: number,
  ): Promise<number> {
    const count = await this.em.transaction(async (tx) => {
      const latestReadOrSent = await this.getLatestReadOrSentTime(
        tx,
        chatId,
        userId,
      );

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
        .andWhere(`message.timestamp > :latestReadOrSent`, { latestReadOrSent })
        .andWhere('read.id IS NULL')
        .getCount();
    });

    return count;
  }

  private async getLatestReadOrSentTime(
    manager: EntityManager,
    chatId: number,
    userId: number,
  ): Promise<Date> {
    const latestRead = await this.getLatestMessageReadByUser(
      manager,
      chatId,
      userId,
    );

    const latestSent = await this.getLatestMessageSentByUser(
      manager,
      chatId,
      userId,
    );

    if (!latestRead && latestSent) {
      return latestSent;
    }

    if (!latestSent && latestRead) {
      return latestRead;
    }

    if (!latestRead || !latestSent) {
      return new Date('1970-01-01');
    }

    return new Date(Math.max(latestRead.valueOf(), latestSent.valueOf()));
  }

  public async getLatestMessageReadByUser(
    manager: EntityManager,
    chatId: number,
    userId: number,
  ): Promise<Date | undefined> {
    const latestReadQuery = manager
      .createQueryBuilder()
      .from(MessageReadEntity, 'read')
      .innerJoin('read.message', 'message')
      .where('message.chatId = :chatId', { chatId })
      .andWhere('read.userId = :userId', { userId })
      .select('MAX(message.timestamp)', 'latestRead');

    return latestReadQuery.getRawOne<{ latestRead: Date }>().then((val) => {
      return val?.latestRead;
    });
  }

  public async getLatestMessageSentByUser(
    manager: EntityManager,
    chatId: number,
    userId: number,
  ): Promise<Date | undefined> {
    const latestSentQuery = manager
      .createQueryBuilder()
      .from(MessageEntity, 'message')
      .where('message.chatId = :chatId', { chatId })
      .andWhere('message.authorId = :userId', { userId })
      .select('MAX(message.timestamp)', 'latestSent');

    return latestSentQuery.getRawOne<{ latestSent: Date }>().then((val) => {
      return val?.latestSent;
    });
  }
}
