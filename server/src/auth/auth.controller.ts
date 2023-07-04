import { Request, Response } from 'express';
import { ExpressHandler } from '../shared/decorators/express-handler.decorator';
import { AuthService, authService } from './auth.service';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ExpressHandler()
  public async register(req: Request, res: Response) {
    const { username, password } = req.body;

    await this.authService.register({ username, password });

    res.status(201).send();
  }

  @ExpressHandler()
  public async login(req: Request, res: Response) {
    const { username, password } = req.body;

    const tokens = await this.authService.login({ username, password });

    res.json(tokens);
  }
}

export const authController = new AuthController(authService);
