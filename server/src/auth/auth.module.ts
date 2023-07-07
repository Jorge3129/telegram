import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserEntity } from 'src/users/entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ACCESS_TOKEN_EXPIRATION_TIME, SECRET_KEY } from 'src/config/constants';
import { UserModule } from 'src/users/user.module';
import { AuthTokenService } from './auth-token.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      global: true,
      secret: SECRET_KEY,
      signOptions: { expiresIn: ACCESS_TOKEN_EXPIRATION_TIME },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthTokenService],
  exports: [AuthTokenService],
})
export class AuthModule {}
