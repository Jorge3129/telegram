import { ChatForView } from '../../../src/chats/view/chat-for-view';
import { UserEntity } from '../../../src/users/entity/user.entity';
import { AppTestingModule } from '../../utils/app-testing-module/app-testing-module';
import { testingModuleFactory } from '../../utils/app-testing-module/app-testing-module.factory';
import { ChatsTestClient } from '../../utils/clients/chats/chats.test-client';
import { mockAuthService } from '../../utils/mocks/mock-auth.service';

describe('ChatsController', () => {
  let testingModule: AppTestingModule;
  let chatsClient: ChatsTestClient;

  beforeAll(async () => {
    testingModule = await testingModuleFactory.create();
    chatsClient = new ChatsTestClient(testingModule);
  });

  afterAll(async () => {
    await testingModule.close();
  });

  it('should get user chats', async () => {
    const em = testingModule.getEntityManager();

    const currentUser = await em.save(
      em.create(UserEntity, {
        username: 'foo',
        password: 'bar',
      }),
    );

    await mockAuthService.login(currentUser.id);

    await chatsClient.seedGroupChat('Bloto', currentUser);

    const fetchedChats = await chatsClient.getUserChats().expect(200).getBody();

    expect(fetchedChats).toMatchObject([
      <ChatForView>{
        title: 'Bloto',
        type: 'group',
        muted: false,
        unread: 0,
      },
    ]);
  });
});
