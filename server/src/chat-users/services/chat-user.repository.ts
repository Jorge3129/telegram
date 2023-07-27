import { FindOptionsWhere, Repository } from 'typeorm';
import { ChatUserEntity } from '../entity/chat-user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

export type UserChatSocket = {
  userId: number;
  socketId: string;
  chatId: number;
};

@Injectable()
export class ChatUserRepository {
  constructor(
    @InjectRepository(ChatUserEntity)
    private readonly chatUserRepo: Repository<ChatUserEntity>,
  ) {}

  public save(dto: Partial<ChatUserEntity>): Promise<ChatUserEntity> {
    return this.chatUserRepo.save({ ...dto });
  }

  public saveMany(dtos: Partial<ChatUserEntity>[]): Promise<ChatUserEntity[]> {
    return this.chatUserRepo.save(dtos.map((dto) => ({ ...dto })));
  }

  public findOneBy(
    where: FindOptionsWhere<ChatUserEntity>,
  ): Promise<ChatUserEntity | null> {
    return this.chatUserRepo.findOneBy(where);
  }

  public findBy(
    where: FindOptionsWhere<ChatUserEntity>,
  ): Promise<ChatUserEntity[]> {
    return this.chatUserRepo.findBy(where);
  }

  public async getOtherChatMember(
    chatId: number,
    currentUserId: number,
  ): Promise<ChatUserEntity | null> {
    const otherMember = await this.chatUserRepo
      .createQueryBuilder('chat_user')
      .leftJoinAndSelect('chat_user.user', 'u')
      .where('chat_user."chatId" = :chatId', { chatId })
      .andWhere('chat_user."userId" != :currentUserId', { currentUserId })
      .getOne();

    return otherMember;
  }

  public async findAllUserContactSockets(
    userId: number,
  ): Promise<UserChatSocket[]> {
    const result = await this.chatUserRepo
      .createQueryBuilder('member')
      .select([
        'member.userId AS "userId"',
        'member.chatId AS "chatId"',
        'user.socketId AS "socketId"',
      ])
      .innerJoin('member.user', 'user')
      .innerJoin('member.chat', 'chat')
      .innerJoin('chat.members', 'targetUser')
      .where('targetUser.userId = :userId', { userId })
      .andWhere('member.userId != :userId', { userId })
      .andWhere('user.socketId IS NOT NULL')
      .distinct()
      .getRawMany<UserChatSocket>();

    return result;
  }

  public async findChatRecipientSockets(
    chatId: number,
    senderUserId: number,
  ): Promise<UserChatSocket[]> {
    const result = await this.chatUserRepo
      .createQueryBuilder('member')
      .select([
        'member.userId AS "userId"',
        'member.chatId AS "chatId"',
        'user.socketId AS "socketId"',
      ])
      .innerJoin('member.user', 'user')
      .innerJoin('member.chat', 'chat')
      .where('chat.id = :chatId', { chatId })
      .andWhere('member.userId != :senderUserId', { senderUserId })
      .andWhere('user.socketId IS NOT NULL')
      .getRawMany<UserChatSocket>();

    return result;
  }
}
