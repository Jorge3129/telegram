import { chatUserRepository } from "../chat-users/chat-user.repository";
import { BaseRepository } from "../shared/base-repository";
import { Chat } from "./chat.type";

export class ChatsRepository extends BaseRepository<Chat> {
  protected rows: Chat[] = [];

  constructor() {
    super();
  }

  public async findByUserId(userId: number): Promise<Chat[]> {
    return await Promise.all(
      this.rows.filter(async (c) => {
        c.members = await chatUserRepository.find((cu) => cu.chatId === c.id);

        return !!c.members.find((u) => u.userId === userId);
      })
    );
  }
}

export const chatsRepo = new ChatsRepository();
