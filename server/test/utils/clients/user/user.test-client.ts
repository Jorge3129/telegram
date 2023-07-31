import { UserEntity } from '../../../../src/users/entity/user.entity';
import { AppTestingModule } from '../../app-testing-module/app-testing-module';
import { BaseTestClient } from '../base-test-client';

export class UserTestClient extends BaseTestClient {
  constructor(protected testingModule: AppTestingModule) {
    super();
  }

  public seedUser(
    username: string,
    password = 'test-password',
  ): Promise<UserEntity> {
    const em = this.testingModule.getEntityManager();

    return em.save(
      em.create(UserEntity, {
        username: username,
        password: password,
      }),
    );
  }
}
