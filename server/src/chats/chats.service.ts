import { Injectable } from '@nestjs/common';
import { ChatUserRepository } from '../chat-users/services/chat-user.repository';
import { User } from '../users/user.type';
import { Chat, ChatForView } from './chat.type';
import { ChatsRepository } from './chats.repository';
import { MessageQueryService } from 'src/messages/queries/message-query.service';
import { MessageReadsQueryService } from 'src/messages/queries/message-reads-query.service';

@Injectable()
export class ChatsService {
  constructor(
    private readonly chatsRepo: ChatsRepository,
    private readonly messageService: MessageQueryService,
    private readonly messageReadsService: MessageReadsQueryService,
    private readonly chatUsersRepo: ChatUserRepository,
  ) {}

  public async getUserChats(user: User): Promise<ChatForView[]> {
    const rawChats = await this.chatsRepo.findByUserId(user.id);

    await Promise.all(
      rawChats.map(async (chat) => {
        chat.members = await this.chatUsersRepo.findBy({ chatId: chat.id });
      }),
    );

    return Promise.all(rawChats.map((ch) => this.mapChatToClient(ch, user.id)));
  }

  private async mapChatToClient(
    chat: Chat,
    userId: number,
  ): Promise<ChatForView> {
    const user = chat.members.filter((u) => u.userId === userId)[0];

    const unreadCount = await this.messageReadsService.countUnreadMessages(
      chat.id,
      userId,
    );

    const lastMessage = await this.messageService.getLatestChatMessage(chat.id);

    const otherMember = await this.chatUsersRepo.getOtherChatMember(
      chat.id,
      userId,
    );

    return {
      id: chat.id,
      title: chat.title || otherMember.user.username,
      lastMessage: lastMessage ?? undefined,
      unread: unreadCount,
      muted: !!user?.muted,
      type: chat.type,
      online: !!otherMember.user.socketId,
    };
  }
}
