import { Injectable } from '@nestjs/common';
import { ChatUserEntity } from 'src/chat-users/entity/chat-user.entity';
import { ChatUserRepository } from 'src/chat-users/services/chat-user.repository';
import { ChatEntity } from 'src/chats/entity/chat.entity';
import {
  isGroupChat,
  isChannel,
} from 'src/chats/entity/chat.entity.type-guards';
import { ChatForView } from 'src/chats/view/chat-for-view';
import { MessageQueryService } from 'src/messages/queries/message-query.service';
import { MessageReadsQueryService } from 'src/messages/queries/message-reads-query.service';
import { UserEntity } from 'src/users/entity/user.entity';

@Injectable()
export class ChatEntityForViewMapper {
  constructor(
    private messageReadsService: MessageReadsQueryService,
    private messageService: MessageQueryService,
    private chatUsersRepo: ChatUserRepository,
  ) {}

  public async mapEntityForView(
    chat: ChatEntity,
    currentUser: UserEntity,
  ): Promise<ChatForView> {
    const userId = currentUser.id;

    const currentChatUser = chat.members.filter((u) => u.userId === userId)[0];

    const unreadCount = await this.messageReadsService.countUnreadMessages(
      chat.id,
      userId,
    );

    const lastMessage = await this.messageService.getLatestChatMessage(
      chat.id,
      currentUser,
    );

    const otherMember = await this.chatUsersRepo.getOtherChatMember(
      chat.id,
      userId,
    );

    return {
      id: chat.id,
      title: this.getChatTitle(chat, otherMember),
      lastMessage: lastMessage ?? undefined,
      unread: unreadCount,
      muted: !!currentChatUser?.muted,
      type: chat.type,
      online: !!otherMember.user.socketId,
    };
  }

  public mapEntitiesForView(
    entities: ChatEntity[],
    currentUser: UserEntity,
  ): Promise<ChatForView[]> {
    return Promise.all(
      entities.map((entity) => this.mapEntityForView(entity, currentUser)),
    );
  }

  private getChatTitle(chat: ChatEntity, otherMember: ChatUserEntity): string {
    if (isGroupChat(chat) || isChannel(chat)) {
      return chat.title;
    }

    return otherMember.user.username;
  }
}
