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
}
