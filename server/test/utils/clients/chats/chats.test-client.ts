import { ChatUserEntity } from '../../../../src/chat-users/entity/chat-user.entity';
import {
  GroupChatEntity,
  ChatType,
} from '../../../../src/chats/entity/chat.entity';
import { ChatForView } from '../../../../src/chats/view/chat-for-view';
import { UserEntity } from '../../../../src/users/entity/user.entity';
import { AppTestingModule } from '../../app-testing-module/app-testing-module';
import * as request from 'supertest';
import { TypedResponse } from '../../models/typed-response';

export class ChatsTestClient {
  constructor(private readonly testingModule: AppTestingModule) {}

  public async getUserChats(): Promise<TypedResponse<ChatForView[]>> {
    const res = await request(this.testingModule.app.getHttpServer()).get(
      '/chats',
    );

    return res;
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
