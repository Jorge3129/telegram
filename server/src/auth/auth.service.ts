import { Repository } from "typeorm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../users/user.type";
import { UserEntity } from "../users/entity/user.entity";
import { HttpException } from "../shared/errors";
import {
  SECRET_KEY,
  ACCESS_TOKEN_EXPIRATION_TIME,
  REFRESH_TOKEN_EXPIRATION_TIME,
} from "../config/constants";
import dataSource from "../data-source";

export type SignedTokens = {
  accessToken: string;
  refreshToken: string;
};

export type UserPass = {
  password: string;
  username: string;
};

export class AuthService {
  constructor(private readonly userRepo: Repository<UserEntity>) {}

  public async register(loginData: UserPass): Promise<void> {
    const hash = await bcrypt.hash(loginData.password, 7);

    await this.userRepo.save({
      username: loginData.username,
      password: hash,
    });
  }

  public async login(loginData: UserPass): Promise<SignedTokens> {
    const user = await this.userRepo.findOneByOrFail({
      username: loginData.username,
    });

    await this.checkPassword(loginData.password, user);

    return this.signTokens(user);
  }

  private async checkPassword(loginPassword: string, user: User) {
    const isPasswordValid = await bcrypt.compare(loginPassword, user.password);

    if (!isPasswordValid) {
      throw new HttpException("Invalid credentials", 401);
    }
  }

  private signTokens(user: User): SignedTokens {
    const payload = { id: user.id, role: "user" };

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

export const authService = new AuthService(
  dataSource.getRepository(UserEntity)
);
