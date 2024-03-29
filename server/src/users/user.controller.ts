import { Controller, Get } from '@nestjs/common';
import { User } from './user.type';
import { RequestUser } from './decorators/user.decorator';
import { UserEntity } from './entity/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  @Get('/current')
  @ApiBearerAuth()
  public async getUser(@RequestUser() user: UserEntity): Promise<User> {
    return { ...user, password: '' };
  }
}
