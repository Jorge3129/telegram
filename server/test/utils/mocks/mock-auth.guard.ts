import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserEntity } from '../../../src/users/entity/user.entity';
import { EntityManager } from 'typeorm';
import { mockAuthService } from './mock-auth.service';

@Injectable()
export class MockAuthGuard implements CanActivate {
  constructor(private entityManager: EntityManager) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request & { user: UserEntity } = context
      .switchToHttp()
      .getRequest();

    const currentUserId = mockAuthService.getCurrentUserId();

    if (!currentUserId) {
      return false;
    }

    req['user'] = await this.entityManager.findOneByOrFail(UserEntity, {
      id: currentUserId,
    });

    return true;
  }
}
