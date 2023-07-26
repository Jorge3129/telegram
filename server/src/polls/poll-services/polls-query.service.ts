import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager, FindOneOptions } from 'typeorm';
import { PollEntity } from '../entity/poll.entity';
import { ChatEntity } from '../../chats/entity/chat.entity';
import { MessageEntity } from '../../messages/entity/message.entity';

@Injectable()
export class PollsQueryService {
  constructor(private entityManager: EntityManager) {}

  public async findOneOrFail(
    options: FindOneOptions<PollEntity>,
  ): Promise<PollEntity> {
    const poll = await this.entityManager.findOne(PollEntity, options);

    if (!poll) {
      throw new NotFoundException('Poll not found');
    }

    return poll;
  }

  public async findOneByIdOrFail(pollId: string): Promise<PollEntity> {
    return this.findOneOrFail({
      where: {
        id: pollId,
      },
    });
  }

  public async findMessagesWithPoll(pollId: string): Promise<MessageEntity[]> {
    const qb = this.entityManager
      .createQueryBuilder()
      .from(MessageEntity, 'message')
      .leftJoin('message.content', 'content')
      .andWhere('content.pollId = :pollId', {
        pollId,
      })
      .select(['message.id', 'message.chatId']);

    return qb.getMany();
  }

  public async isUserMemberOfChatsWithPoll(
    userId: number,
    pollId: string,
  ): Promise<boolean> {
    const qb = this.entityManager
      .createQueryBuilder()
      .from(ChatEntity, 'chat')
      .innerJoin('chat.members', 'member')
      .innerJoin('messages', 'message', 'message.chatId = chat.id')
      .innerJoin('message.content', 'content')
      .where('content.pollId = :pollId', {
        pollId,
      })
      .andWhere('member.userId = :userId', { userId });

    return qb.getCount().then((count) => count !== 0);
  }
}
