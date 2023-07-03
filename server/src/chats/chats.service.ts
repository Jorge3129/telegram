import { chatUserRepository } from "../chat-users/chat-user.repository";
import { MessageService, messageService } from "../messages/message.service";
import { userRepository } from "../users/user.repository";
import { Chat, ChatForView } from "./chat.type";
import { ChatsRepository, chatsRepo } from "./chats.repository";

export class ChatsService {
  constructor(
    private readonly chatsRepo: ChatsRepository,
    private readonly messageService: MessageService
  ) {}

  public async getUserChats(userId: number): Promise<ChatForView[]> {
    const rawChats = await this.chatsRepo.findByUserId(userId);

    await Promise.all(
      rawChats.map(async (chat) => {
        chat.members = await chatUserRepository.findBy({ chatId: chat.id });
      })
    );

    return Promise.all(rawChats.map((ch) => this.mapChatToClient(ch, userId)));
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

    const receiverId = chat.members.filter((u) => u.userId !== userId)[0]
      .userId;

    const receiverName = (await userRepository.findBy({ id: receiverId }))[0]
      .username;

    return {
      id: chat.id,
      title: chat.title || receiverName,
      lastMessage: lastMessage ?? undefined,
      unread: unreadCount,
      muted: !!user?.muted,
      type: chat.type,
      //online: users.find(u => u.username === receiverName)?.online
    };
  }
}

export const chatsService = new ChatsService(chatsRepo, messageService);
