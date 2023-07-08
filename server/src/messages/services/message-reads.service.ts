import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageReadEntity } from '../entity/message-read.entity';
import { MessageEntity } from '../entity/message.entity';

@Injectable()
export class MessageReadsService {
  constructor(
    @InjectRepository(MessageEntity)
    private messageRepo: Repository<MessageEntity>,

    @InjectRepository(MessageReadEntity)
    private messageReadRepo: Repository<MessageReadEntity>,
  ) {}

  public async countUnreadMessages(
    chatId: number,
    userId: number,
  ): Promise<number> {
    const latestReadSubquery = this.messageReadRepo
      .createQueryBuilder('read')
      .innerJoin('read.message', 'message')
      .where('read.userId = :userId', { userId })
      .select('MAX(message.timestamp)', 'latestRead');

    const count = await this.messageRepo
      .createQueryBuilder('message')
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

    return count;
  }

  public async updateSeen(
    readByUserId: number,
    message: {
      chatId: number;
      timestamp: string;
    },
  ): Promise<void> {
    const qb = this.messageRepo
      .createQueryBuilder('message')
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

    await this.messageReadRepo.save(values).catch((e) => {
      console.log(e);
    });
  }
}
