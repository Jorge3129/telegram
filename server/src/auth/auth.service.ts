import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User } from '../users/user.type';
import { UserEntity } from '../users/entity/user.entity';
import {
  SECRET_KEY,
  ACCESS_TOKEN_EXPIRATION_TIME,
  REFRESH_TOKEN_EXPIRATION_TIME,
} from '../config/constants';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

export type SignedTokens = {
  accessToken: string;
  refreshToken: string;
};

export type UserPass = {
  password: string;
  username: string;
};

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  public async register(loginData: UserPass): Promise<void> {
    const hash = await bcrypt.hash(loginData.password, 7);

    await this.userRepo.save({
      username: loginData.username,
      password: hash,
    });
  }

  public async login(loginData: UserPass): Promise<SignedTokens> {
    const user = await this.userRepo.findOneOrFail({
      where: {
        username: loginData.username,
      },
      select: {
        id: true,
        password: true,
      },
    });

    await this.checkPassword(loginData.password, user);

    return this.signTokens(user);
  }

  private async checkPassword(loginPassword: string, user: User) {
    const isPasswordValid = await bcrypt.compare(loginPassword, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  private signTokens(user: User): SignedTokens {
    const payload = { id: user.id, role: 'user' };

    const accessToken = jwt.sign(payload, SECRET_KEY, {
      expiresIn: ACCESS_TOKEN_EXPIRATION_TIME,
    });

    const refreshToken = jwt.sign(payload, SECRET_KEY, {
      expiresIn: REFRESH_TOKEN_EXPIRATION_TIME,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
