import { chatUserRepository } from "../chat-users/chat-user.repository";
import { messageService } from "../messages/message.service";
import { Message } from "../messages/models/message.type";
import { userRepository } from "../users/user.repository";
import { Chat, ChatForView } from "./chat.type";
import { ChatsRepository, chatsRepo } from "./chats.repository";
import dayjs from "dayjs";

export class ChatsService {
  constructor(private readonly chatsRepo: ChatsRepository) {}

  public async getUserChats(userId: number): Promise<ChatForView[]> {
    const rawChats = await this.chatsRepo.findByUserId(userId);

    await Promise.all(
      rawChats.map(async (chat) => {
        chat.members = await chatUserRepository.find({ chatId: chat.id });
      })
    );

    return Promise.all(rawChats.map((ch) => this.mapChatToClient(ch, userId)));
  }

  public async updateLastRead(userId: number, message: Message) {
    const chat = await this.chatsRepo.findOne((ch) => ch.id === message.chatId);

    if (!chat) {
      return { success: false };
    }

    const searchedUser = chat.members.find((u) => u.userId === userId);

    if (searchedUser) {
      searchedUser.lastRead = message.timestamp;
    }

    return { success: true };
  }

  private async mapChatToClient(
    { id, members, type, title }: Chat,
    userId: number
  ): Promise<ChatForView> {
    let unreadCount = 0;

    const user = members.find((u) => u.userId === userId);

    const lastRead = user?.lastRead;

    const msgs = await messageService.getMessagesByChat(id);

    if (lastRead) {
      unreadCount = msgs.filter(
        (m) => dayjs(m.timestamp).diff(dayjs(lastRead), "minute") > 0
      ).length;
    }

    if (!members.filter((u) => u.userId !== userId)[0]) {
      console.log(members);
    }

    const receiverId = members.filter((u) => u.userId !== userId)[0].userId;

    const receiverName = (await userRepository.findBy({ id: receiverId }))[0]
      .username;

    return {
      id,
      title: title || receiverName,
      lastMessage: msgs.slice(-1)[0],
      unread: unreadCount,
      muted: !!user?.muted,
      type,
      //online: users.find(u => u.username === receiverName)?.online
    };
  }
}

export const chatsService = new ChatsService(chatsRepo);
