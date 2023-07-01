import { ChatUser } from "../chat-users/chat-user.type";
import { ChatsRepository, chatsRepo } from "../chats/chats.repository";
import { UserRepository, userRepository } from "./user.repository";
import { User } from "./user.type";

export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private chatsRepo: ChatsRepository
  ) {}

  public async getUserSocketId(userId: number): Promise<string | undefined> {
    const userReceiver = await userRepository.findOne({ id: userId });

    return userReceiver?.socketId;
  }

  public async findUserContacts(
    targetUserId: number
  ): Promise<{ chatUser: ChatUser; user: User; chatId: number }[]> {
    const chats = await this.chatsRepo.findByUserId(targetUserId);

    const contacts = chats.map(async (ch) => {
      const contactChatUser = ch.members.find((u) => u.userId !== targetUserId);

      if (!contactChatUser) {
        return [];
      }

      const contactUser = await this.userRepo
        .find({ id: contactChatUser.userId })
        .then((res) => res[0]);

      return [
        {
          chatUser: contactChatUser,
          user: contactUser,
          chatId: ch.id,
        },
      ];
    });

    return (await Promise.all(contacts)).flat();
  }
}

export const userService = new UserService(userRepository, chatsRepo);
