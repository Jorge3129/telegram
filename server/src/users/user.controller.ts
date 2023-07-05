import { UserRepository } from './user.repository';
import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { User } from './user.type';

@Controller('users')
export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  @Get('/:userId')
  public async getUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException('No user');
    }

    return { ...user, password: '' };
  }
}
