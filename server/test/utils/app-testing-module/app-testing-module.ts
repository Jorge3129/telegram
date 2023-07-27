import { INestApplication, Type } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { EntityManager, Repository } from 'typeorm';

export class AppTestingModule {
  constructor(public readonly app: INestApplication) {}

  public getRepository<TEntity extends object>(
    entity: Type<TEntity> | EntityClassOrSchema,
  ) {
    return this.app.get<Repository<TEntity>>(getRepositoryToken(entity));
  }

  public getEntityManager(): EntityManager {
    return this.app.get(EntityManager);
  }

  public async close(): Promise<void> {
    await this.app.close();
  }
}
