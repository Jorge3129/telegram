import { mockChats } from "../mocks/mock.chats";
import { BaseRepository } from "../shared/base-repository";
import { Chat } from "./chat.type";

export class ChatsRepository extends BaseRepository<Chat> {
  protected rows: Chat[] = [];

  constructor() {
    super();

    this.saveMany(mockChats);
  }

  public async findByUserName(username: string): Promise<Chat[]> {
    return this.rows.filter(
      (c) => !!c.members.find((u) => u.username === username)
    );
  }
}

export const chatsRepo = new ChatsRepository();
