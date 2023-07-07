import { FindOptionsWhere, Repository } from 'typeorm';
import { MessageEntity } from './entity/message.entity';
import { MessageReadEntity } from './entity/message-read.entity';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MessagesRepository {
  constructor(
    @InjectRepository(MessageEntity)
    private messageRepo: Repository<MessageEntity>,

    @InjectRepository(MessageReadEntity)
    private messageReadRepo: Repository<MessageReadEntity>,
  ) {}

  public save(dto: Partial<MessageEntity>): Promise<MessageEntity> {
    return this.messageRepo.save({ ...dto });
  }

  public saveMany(dtos: Partial<MessageEntity>[]): Promise<MessageEntity[]> {
    return this.messageRepo.save(dtos.map((dto) => ({ ...dto })));
  }

  public async delete(messageId: string): Promise<void> {
    await this.messageReadRepo.delete({ messageId });

    await this.messageRepo.delete(messageId);
  }

  public findOneBy(
    where: FindOptionsWhere<MessageEntity>,
  ): Promise<MessageEntity | null> {
    return this.messageRepo.findOneBy(where);
  }

  public findBy(
    where: FindOptionsWhere<MessageEntity>,
  ): Promise<MessageEntity[]> {
    return this.messageRepo.find({
      where,
      relations: {
        reads: true,
      },
    });
  }

  public getMessagesForChat(chatId: number): Promise<MessageEntity[]> {
    return this.messageRepo.find({
      where: {
        chatId,
      },
      relations: {
        reads: true,
      },
      order: {
        timestamp: 'asc',
      },
    });
  }

  public async getLatestMessage(chatId: number): Promise<MessageEntity | null> {
    const message = await this.messageRepo.findOne({
      where: {
        chatId,
      },
      relations: {
        reads: true,
      },
      order: {
        timestamp: 'desc',
      },
    });

    return message;
  }

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
