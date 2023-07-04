import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

import { ChatEntity } from './entity/chat.entity';
import { ChatUserEntity } from '../chat-users/entity/chat-user.entity';

@Injectable()
export class ChatsRepository {
  constructor(
    @InjectRepository(ChatEntity)
    private readonly chatRepo: Repository<ChatEntity>,
  ) {}

  public async findByUserId(userId: number): Promise<ChatEntity[]> {
    return this.chatRepo
      .createQueryBuilder('chat')
      .innerJoin(ChatUserEntity, 'chatUser', 'chatUser.chatId = chat.id')
      .where('chatUser.userId = :userId', { userId })
      .getMany();
  }

  public save(dto: Partial<ChatEntity>): Promise<ChatEntity> {
    return this.chatRepo.save({ ...dto });
  }

  public saveMany(dtos: Partial<ChatEntity>[]): Promise<ChatEntity[]> {
    return this.chatRepo.save(dtos.map((dto) => ({ ...dto })));
  }

  public findOneBy(
    where: FindOptionsWhere<ChatEntity>,
  ): Promise<ChatEntity | null> {
    return this.chatRepo.findOneBy(where);
  }

  public findBy(where: FindOptionsWhere<ChatEntity>): Promise<ChatEntity[]> {
    return this.chatRepo.findBy(where);
  }
}
