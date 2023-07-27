import { UserEntity } from '../../../src/users/entity/user.entity';
import { AppTestingModule } from '../../utils/app-testing-module/app-testing-module';
import { testingModuleFactory } from '../../utils/app-testing-module/app-testing-module.factory';

describe('AppController (e2e)', () => {
  let testingModule: AppTestingModule;

  beforeAll(async () => {
    testingModule = await testingModuleFactory.create();
  });

  afterAll(async () => {
    await testingModule.close();
  });

  it('should insert something', async () => {
    const repo = testingModule.getRepository(UserEntity);

    const user = repo.create({
      username: 'Foo',
      password: 'bar',
    });

    await repo.save(user);

    expect(await repo.count()).toBe(1);
  });

  it('should find nothing', async () => {
    const repo = testingModule.getRepository(UserEntity);

    expect(await repo.count()).toBe(0);
  });
});
