import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager, FindOneOptions } from 'typeorm';
import { PollEntity } from '../entity/poll.entity';
import { MessageEntity } from 'src/messages/entity/message.entity';
import { MessageContentType } from 'src/messages/entity/message-content/message-content-type';
import { ChatEntity } from 'src/chats/entity/chat.entity';

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

  public async findMessagesWithPoll(pollId: string): Promise<MessageEntity[]> {
    const qb = this.entityManager
      .createQueryBuilder()
      .from(MessageEntity, 'message')
      .leftJoin('message.content', 'content')
      .andWhere('content.pollId = :pollId', {
        pollId,
      })
      .select(['message.id', 'message.chatId']);

    // console.log(qb.getQueryAndParameters());
    return qb.getMany();
  }

  public async findChatsWithPoll(pollId: string): Promise<ChatEntity[]> {
    const qb = this.entityManager
      .createQueryBuilder()
      .from(ChatEntity, 'chat')
      .innerJoin('chat.messages', 'message')
      .innerJoin('message.content', 'content')
      .where('content.type = :pollType', {
        pollType: MessageContentType.POLL_MESSAGE,
      })
      .andWhere('content.pollId = :pollId', {
        pollId,
      })
      .distinct();

    return qb.getMany();
  }
}
