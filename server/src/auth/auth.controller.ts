import { Request, Response } from "express";
import { userRepository } from "../users/user.repository";
import { ExpressHandler } from "../shared/decorators/express-handler.decorator";

export class AuthController {
  @ExpressHandler()
  public async register(req: Request, res: Response) {
    const { username, password } = req.body;

    await userRepository.save({ username, password });

    res.send({ success: true });
  }

  @ExpressHandler()
  public async login(req: Request, res: Response) {
    const { username, password } = req.body;

    const user = await userRepository.findOne({
      username,
      password,
    });

    if (user) {
      res.json({ username, userId: user.id });
    } else {
      res.status(403).json({ success: false });
    }
  }
}

export const authController = new AuthController();
