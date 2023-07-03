import {
  ChatUserRepository,
  chatUserRepository,
} from "../chat-users/chat-user.repository";
import { MessageService, messageService } from "../messages/message.service";
import { User } from "../users/user.type";
import { Chat, ChatForView } from "./chat.type";
import { ChatsRepository, chatsRepo } from "./chats.repository";

export class ChatsService {
  constructor(
    private readonly chatsRepo: ChatsRepository,
    private readonly messageService: MessageService,
    private readonly chatUsersRepo: ChatUserRepository
  ) {}

  public async getUserChats(user: User): Promise<ChatForView[]> {
    const rawChats = await this.chatsRepo.findByUserId(user.id);

    await Promise.all(
      rawChats.map(async (chat) => {
        chat.members = await chatUserRepository.findBy({ chatId: chat.id });
      })
    );

    return Promise.all(rawChats.map((ch) => this.mapChatToClient(ch, user.id)));
  }

  private async mapChatToClient(
    chat: Chat,
    userId: number
  ): Promise<ChatForView> {
    const user = chat.members.filter((u) => u.userId === userId)[0];

    const unreadCount = await messageService.countUnreadsForChat(
      chat.id,
      userId
    );

    const lastMessage = await this.messageService.getLatestChatMessage(chat.id);

    const otherMember = await this.chatUsersRepo.getOtherChatMember(
      chat.id,
      userId
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

export const chatsService = new ChatsService(
  chatsRepo,
  messageService,
  chatUserRepository
);
