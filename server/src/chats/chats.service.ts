import { messageService } from "../messages/message.service";
import { Message } from "../messages/models/message.type";
import { Chat, ChatForView } from "./chat.type";
import { ChatsRepository, chatsRepo } from "./chats.repository";
import dayjs from "dayjs";

export class ChatsService {
  constructor(private readonly chatsRepo: ChatsRepository) {}

  public async getUserChats(username: string): Promise<ChatForView[]> {
    const rawChats = await this.chatsRepo.findByUserName(username);

    return Promise.all(
      rawChats.map((ch) => this.mapChatToClient(ch, username))
    );
  }

  public async updateLastRead(user: string, message: Message) {
    const chat = await this.chatsRepo.findOne((ch) => ch.id === message.chatId);

    if (!chat) {
      return { success: false };
    }

    const searchedUser = chat.members.find((u) => u.username === user);

    if (searchedUser) {
      searchedUser.lastRead = message.timestamp;
    }

    return { success: true };
  }

  private async mapChatToClient(
    { id, members, type, title }: Chat,
    username: string
  ): Promise<ChatForView> {
    let unreadCount = 0;
    const user = members.find((u) => u.username === username);
    const lastRead = user?.lastRead;

    const msgs = await messageService.getMessagesByChat(id);

    if (lastRead) {
      unreadCount = msgs.filter(
        (m) => dayjs(m.timestamp).diff(dayjs(lastRead), "minute") > 0
      ).length;
    }

    const receiverName =
      members.find((u) => u.username !== username)?.username || "";

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
