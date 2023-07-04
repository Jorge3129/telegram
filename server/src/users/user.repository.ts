import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { User } from './user.type';
import { UserEntity } from './entity/user.entity';
import dataSource from '../data-source';

export class UserRepository {
  protected rows: User[] = [];

  constructor(private readonly userRepo: Repository<UserEntity>) {}

  public save(dto: Partial<UserEntity>): Promise<UserEntity> {
    return this.userRepo.save({ ...dto });
  }

  public saveMany(dtos: Partial<UserEntity>[]): Promise<UserEntity[]> {
    return this.userRepo.save(dtos.map((dto) => ({ ...dto })));
  }

  public findOneBy(
    where: FindOptionsWhere<UserEntity>,
  ): Promise<UserEntity | null> {
    return this.userRepo.findOneBy(where);
  }

  public findOneByOrFail(
    where: FindOptionsWhere<UserEntity>,
  ): Promise<UserEntity> {
    return this.userRepo.findOneByOrFail(where);
  }

  public findBy(where: FindOptionsWhere<UserEntity>): Promise<UserEntity[]> {
    return this.userRepo.findBy(where);
  }

  public async update(
    where: FindOptionsWhere<UserEntity>,
    value: DeepPartial<UserEntity>,
  ) {
    await this.userRepo.update(where, value);
  }
}

export const userRepository = new UserRepository(
  dataSource.getRepository(UserEntity),
);
