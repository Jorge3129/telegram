import { ChatsRepository, chatsRepo } from "../chats/chats.repository";
import { UserRepository, userRepository } from "./user.repository";
import { User } from "./user.type";

export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private chatsRepo: ChatsRepository
  ) {}

  public async getUserSocketId(username: string): Promise<string> {
    const userReceiver = await userRepository.findOne(
      (u) => u.username === username
    );

    return userReceiver?.socketId || "";
  }

  public async findUserContacts(
    user: User
  ): Promise<{ username?: string; chatId: number }[]> {
    const chats = await this.chatsRepo.find(
      (ch) => !!ch.members.find((u) => u.username === user.username)
    );

    return chats.map((ch) => ({
      username: ch.members.find((u) => u.username !== user.username)?.username,
      chatId: ch.id,
    }));
  }
}

export const userService = new UserService(userRepository, chatsRepo);
