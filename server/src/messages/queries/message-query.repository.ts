import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { MessageEntity } from '../entity/message.entity';

@Injectable()
export class MessageQueryRepository {
  constructor(
    @InjectRepository(MessageEntity)
    private messageRepo: Repository<MessageEntity>,
  ) {}

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

  public findOneBy(
    where: FindOptionsWhere<MessageEntity>,
  ): Promise<MessageEntity | null> {
    return this.messageRepo.findOneBy(where);
  }

  public async findOneByOrFail(
    where: FindOptionsWhere<MessageEntity>,
  ): Promise<MessageEntity> {
    const message = await this.findOneBy(where);

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    return message;
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
}
