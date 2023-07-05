import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  public async getUserSocketId(userId: number): Promise<string | undefined> {
    const userReceiver = await this.userRepo.findOneBy({ id: userId });

    return userReceiver?.socketId;
  }
}
