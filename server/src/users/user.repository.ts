import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import dataSource from 'src/data-source';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

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
