import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Socket } from 'socket.io';
import { SocketAuthService } from '../services/socket-auth.service';
import { UserEntity } from '../../users/entity/user.entity';
import { AppLoggerService } from '../../logging/app-logger.service';

export interface SocketWithUser extends Socket {
  user: UserEntity;
}

@Injectable()
export class SocketAuthGuard implements CanActivate {
  constructor(
    private socketAuthService: SocketAuthService,
    private logger: AppLoggerService,
  ) {
    this.logger.setContext(SocketAuthGuard.name);
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient<SocketWithUser>();

    try {
      const user = await this.socketAuthService.getUserFromSocket(client);

      client.user = user;

      return true;
    } catch (e) {
      this.logger.error(e);

      return false;
    }
  }
}
