import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../src/users/entity/user.entity';
import { Repository } from 'typeorm';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/should insert something', async () => {
    const repo = app.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );

    const user = new UserEntity();
    user.username = 'Foo';
    user.password = 'bar';

    await repo.save(user);

    expect(await repo.count()).toBe(1);
  });

  it('/should find nothing', async () => {
    const repo = app.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );

    expect(await repo.count()).toBe(0);
  });
});
