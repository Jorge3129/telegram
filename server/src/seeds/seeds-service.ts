import { chatUserRepository } from "../chat-users/chat-user.repository";
import { ChatUser } from "../chat-users/chat-user.type";
import { ChatUserEntity } from "../chat-users/entity/chat-user.entity";
import { chatsRepo } from "../chats/chats.repository";
import dataSource from "../data-source";
import { messagesRepo } from "../messages/message.repository";
import { userRepository } from "../users/user.repository";
import { mockChats } from "./mock.chats";
import { mockMessages } from "./mock.messages";
import { mockUsers } from "./mock.users";

export class SeedsService {
  public async seed() {
    await dataSource.initialize();

    const users = await userRepository.saveMany(mockUsers);

    const fullChats = mockChats.map((chat) => ({
      ...chat,
      members: chat.members.map((member): ChatUserEntity => {
        return <any>{
          chatId: chat.id,
          lastRead: member.lastRead,
          muted: member.muted,
          userId: users.filter((u) => u.username === member.user.username)[0]
            .id,
          user: users.filter((u) => u.username === member.user.username)[0],
        };
      }),
    }));

    // console.log(JSON.stringify(fullChats, null, 2));

    // await chatsRepo.saveMany(
    //   fullChats.map((chat) => ({ ...chat, members: [] }))
    // );

    // // await chatUserRepository.saveMany(
    // //   fullChats.flatMap((chat) => chat.members)
    // // );

    // await messagesRepo.saveMany(
    //   mockMessages.map((message) => {
    //     delete (<any>message).id;

    //     return <any>{
    //       ...message,
    //       author: users.filter((u) => u.username === message.author)[0],
    //       authorId: users.filter((u) => u.username === message.author)[0].id,
    //     };
    //   })
    // );
  }
}

export const seedsService = new SeedsService();
