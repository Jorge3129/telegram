import { mockChats } from "../mocks/mock.chats";
import { Chat } from "./chat.type";

export class ChatsRepository {
  private readonly chats: Chat[] = [];

  constructor() {
    this.chats.push(...mockChats);
  }

  public async findByUserName(username: string): Promise<Chat[]> {
    return this.chats.filter(
      (c) => !!c.members.find((u) => u.username === username)
    );
  }

  public async findOne(
    predicate: (chat: Chat) => boolean
  ): Promise<Chat | null> {
    return this.chats.find(predicate) ?? null;
  }

  public async find(predicate: (chat: Chat) => boolean): Promise<Chat[]> {
    return this.chats.filter(predicate);
  }
}

export const chatsRepo = new ChatsRepository();
