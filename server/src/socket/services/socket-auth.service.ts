import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { AuthTokenService } from 'src/auth/auth-token.service';
import { UserEntity } from 'src/users/entity/user.entity';

@Injectable()
export class SocketAuthService {
  constructor(private authTokenService: AuthTokenService) {}

  public async getUserFromSocket(socket: Socket): Promise<UserEntity> {
    try {
      const authHeader = socket.handshake.headers.authorization ?? '';

      return await this.authTokenService.getUserFromAuthHeader(authHeader);
    } catch (e) {
      socket.disconnect();

      throw e;
    }
  }
}
