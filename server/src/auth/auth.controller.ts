import { Body, Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService, SignedTokens } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Get('register')
  public async register(@Body() userData: any): Promise<void> {
    const { username, password } = userData;

    await this.authService.register({ username, password });
  }

  @Get('login')
  public async login(@Body() loginData: any): Promise<SignedTokens> {
    const { username, password } = loginData;

    return await this.authService.login({ username, password });
  }
}
