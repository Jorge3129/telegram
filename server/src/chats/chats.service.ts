import { Injectable } from '@nestjs/common';
import { ChatUserRepository } from '../chat-users/services/chat-user.repository';
import { ChatsRepository } from './chats.repository';
import { ChatForView } from './view/chat-for-view';
import { ChatEntityForViewMapper } from './mappers/entity-for-view/chat.entity-for-view.mapper';
import { UserEntity } from 'src/users/entity/user.entity';

@Injectable()
export class ChatsService {
  constructor(
    private readonly chatsRepo: ChatsRepository,
    private readonly chatUsersRepo: ChatUserRepository,
    private chatMapper: ChatEntityForViewMapper,
  ) {}

  public async getUserChats(user: UserEntity): Promise<ChatForView[]> {
    const rawChats = await this.chatsRepo.findByUserId(user.id);

    // TODO refactor
    await Promise.all(
      rawChats.map(async (chat) => {
        chat.members = await this.chatUsersRepo.findBy({ chatId: chat.id });
      }),
    );

    return this.chatMapper.mapEntitiesForView(rawChats, user);
  }
}
