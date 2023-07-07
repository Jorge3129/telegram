import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Socket } from 'socket.io';
import { UserEntity } from 'src/users/entity/user.entity';
import { SocketAuthService } from '../services/socket-auth.service';

export interface SocketWithUser extends Socket {
  user: UserEntity;
}

@Injectable()
export class SocketAuthGuard implements CanActivate {
  constructor(private socketAuthService: SocketAuthService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient<SocketWithUser>();

    try {
      const user = await this.socketAuthService.getUserFromSocket(client);

      client.user = user;

      return true;
    } catch (e) {
      console.log(e);

      return false;
    }
  }
}
