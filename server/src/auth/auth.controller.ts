import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService, SignedTokens } from './auth.service';
import { Public } from './public.decorator';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  public async register(@Body() userData: RegisterDto): Promise<void> {
    const { username, password } = userData;

    await this.authService.register({ username, password });
  }

  @Public()
  @Post('login')
  public async login(@Body() loginData: LoginDto): Promise<SignedTokens> {
    const { username, password } = loginData;

    return await this.authService.login({ username, password });
  }
}
