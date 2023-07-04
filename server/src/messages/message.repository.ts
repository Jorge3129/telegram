import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateMessageDto, Message } from './models/message.type';
import { MessageEntity, PersonalMessageEntity } from './entity/message.entity';
import dataSource from '../data-source';
import { MessageReadEntity } from './entity/message-read.entity';
import {
  MediaMessageContentEntity,
  MessageContentEntity,
  TextMessageContentEntity,
} from './entity/message-content.entity';
import { MediaEntity } from './entity/media.entity';
import { userRepository } from '../users/user.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MessagesRepository {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepo: Repository<MessageEntity>,

    @InjectRepository(MessageReadEntity)
    private readonly messageReadRepo: Repository<MessageReadEntity>,

    @InjectRepository(MessageContentEntity)
    private readonly messageContentRepo: Repository<MessageContentEntity>,
  ) {}

  public save(dto: Partial<MessageEntity>): Promise<MessageEntity> {
    return this.messageRepo.save({ ...dto });
  }

  public async saveFromDto(dto: CreateMessageDto): Promise<MessageEntity> {
    const message = this.createMessage(dto);

    const content = await this.messageContentRepo.save(message.content);

    const savedMessage = await this.messageRepo.save({ ...message, content });

    savedMessage.author = await userRepository.findOneByOrFail({
      id: message.authorId,
    });

    return savedMessage;
  }

  private createMessage(dto: CreateMessageDto): MessageEntity {
    const message = new PersonalMessageEntity();
    message.authorId = dto.authorId;
    message.chatId = dto.chatId;
    message.content = this.createMessageContent(dto);
    message.timestamp = dto.timestamp;

    return message;
  }

  private createMessageContent(dto: CreateMessageDto): MessageContentEntity {
    if (!dto.media?.filename) {
      const textContent = new TextMessageContentEntity();
      textContent.textContent = dto.text;

      return textContent;
    }

    const media = new MediaEntity();
    media.fileName = dto.media.filename;
    media.mimeType = dto.media.type;

    const mediaContent = new MediaMessageContentEntity();
    mediaContent.media = [media];
    mediaContent.textContent = dto.text;

    return mediaContent;
  }

  public saveMany(dtos: Partial<MessageEntity>[]): Promise<MessageEntity[]> {
    return this.messageRepo.save(dtos.map((dto) => ({ ...dto })));
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
    message: Message,
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

export const messagesRepo = new MessagesRepository(
  dataSource.getRepository(MessageEntity),
  dataSource.getRepository(MessageReadEntity),
  dataSource.getRepository(MessageContentEntity),
);
