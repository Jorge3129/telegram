import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SECRET_KEY } from '../config/constants';
import { UserRepository } from '../users/user.repository';

@Injectable()
export class AuthTokenService {
  constructor(
    private jwtService: JwtService,
    private userRepo: UserRepository,
  ) {}

  public async getUserFromAuthHeader(authHeader: string) {
    const token = this.extractTokenFromHeader(authHeader);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync<{ id: number }>(token, {
        secret: SECRET_KEY,
      });

      return await this.userRepo.findOneByOrFail({ id: payload.id });
    } catch {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(authHeader: string): string | undefined {
    const [type, token] = authHeader.split(' ');

    return type === 'Bearer' ? token : undefined;
  }
}
