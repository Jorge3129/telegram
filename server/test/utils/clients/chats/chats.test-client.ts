import { ChatUserEntity } from '../../../../src/chat-users/entity/chat-user.entity';
import {
  GroupChatEntity,
  ChatType,
} from '../../../../src/chats/entity/chat.entity';
import { ChatForView } from '../../../../src/chats/view/chat-for-view';
import { UserEntity } from '../../../../src/users/entity/user.entity';
import { AppTestingModule } from '../../app-testing-module/app-testing-module';
import * as superTestRequest from 'supertest';
import { TestRequest, toTestRequest } from '../../test-request/test-request';

export class ChatsTestClient {
  constructor(private readonly testingModule: AppTestingModule) {}

  public getUserChats(): TestRequest<ChatForView[]> {
    const req = superTestRequest(this.testingModule.app.getHttpServer()).get(
      '/chats',
    );

    return toTestRequest(req);
  }

  public async seedGroupChat(
    title: string,
    user: UserEntity,
  ): Promise<GroupChatEntity> {
    const em = this.testingModule.getEntityManager();

    const groupChat = await em.save(
      em.create(GroupChatEntity, {
        type: ChatType.GROUP,
        title: title,
      }),
    );

    await em.save(
      em.create(ChatUserEntity, {
        chat: groupChat,
        user: user,
        muted: false,
      }),
    );

    return groupChat;
  }
}
