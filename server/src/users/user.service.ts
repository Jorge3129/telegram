import { ChatUser } from "../chats/chat.type";
import { ChatsRepository, chatsRepo } from "../chats/chats.repository";
import { UserRepository, userRepository } from "./user.repository";
import { User } from "./user.type";

export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private chatsRepo: ChatsRepository
  ) {}

  public async getUserSocketId(username: string): Promise<string | undefined> {
    const userReceiver = await userRepository.findOne(
      (u) => u.username === username
    );

    return userReceiver?.socketId;
  }

  public async findUserContacts(
    targetUser: User
  ): Promise<{ chatUser: ChatUser; user: User; chatId: number }[]> {
    const chats = await this.chatsRepo.find(
      (ch) => !!ch.members.find((u) => u.username === targetUser.username)
    );

    const contacts = chats.map(async (ch) => {
      const contactChatUser = ch.members.filter(
        (u) => u.username !== targetUser.username
      )[0];

      const contactUser = await this.userRepo
        .find((u) => u.username === contactChatUser.username)
        .then((res) => res[0]);

      return {
        chatUser: contactChatUser,
        user: contactUser,
        chatId: ch.id,
      };
    });

    return Promise.all(contacts);
  }
}

export const userService = new UserService(userRepository, chatsRepo);
