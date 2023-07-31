import { ChatUserEntity } from '../../../../src/chat-users/entity/chat-user.entity';
import {
  GroupChatEntity,
  ChatType,
} from '../../../../src/chats/entity/chat.entity';
import { ChatForView } from '../../../../src/chats/view/chat-for-view';
import { UserEntity } from '../../../../src/users/entity/user.entity';
import { AppTestingModule } from '../../app-testing-module/app-testing-module';
import { TestRequest, toTestRequest } from '../../test-request/test-request';
import { BaseTestClient } from '../base-test-client';

export class ChatsTestClient extends BaseTestClient {
  constructor(protected readonly testingModule: AppTestingModule) {
    super();
  }

  public getUserChats(): TestRequest<ChatForView[]> {
    const req = this.request().get('/chats');

    return toTestRequest(req);
  }

  public async seedGroupChat(
    title: string,
    users: UserEntity[],
  ): Promise<GroupChatEntity> {
    const em = this.testingModule.getEntityManager();

    const groupChat = await em.save(
      em.create(GroupChatEntity, {
        type: ChatType.GROUP,
        title: title,
      }),
    );

    await em.save(
      users.map((user) =>
        em.create(ChatUserEntity, {
          chat: groupChat,
          user: user,
          muted: false,
        }),
      ),
    );

    return groupChat;
  }
}
