import { Injectable } from '@nestjs/common';
import { MessageEntityToModelMapper } from '../mappers/entity-to-model/message-entity-to-model.mapper';
import { Message } from '../models/message.type';
import { MessageQueryRepository } from './message-query.repository';
import { ChatMembershipService } from '../../chat-users/services/chat-membership.service';
import { UserEntity } from '../../users/entity/user.entity';

@Injectable()
export class MessageQueryService {
  constructor(
    private messageRepo: MessageQueryRepository,
    private membershipService: ChatMembershipService,
    private messageMapper: MessageEntityToModelMapper,
  ) {}

  public async getLatestChatMessage(
    chatId: number,
    currentUser: UserEntity,
  ): Promise<Message | null> {
    const message = await this.messageRepo.getLatestMessage(chatId);

    if (!message) {
      return null;
    }

    return this.messageMapper.mapEntityToModel(message, currentUser);
  }

  public async getMessagesForChat(
    chatId: number,
    user: UserEntity,
  ): Promise<Message[]> {
    await this.membershipService.checkUserChatMembership(user.id, chatId);

    const messages = await this.messageRepo.getMessagesForChat(chatId);

    return this.messageMapper.mapEntitiesToModel(messages, user);
  }
}
