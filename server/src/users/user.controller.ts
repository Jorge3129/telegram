import { Request, Response } from "express";
import { UserRepository, userRepository } from "./user.repository";
import { ExpressHandler } from "../shared/decorators/express-handler.decorator";
import { HttpException } from "../shared/errors";

export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  @ExpressHandler()
  public async getUser(req: Request, res: Response) {
    const userId = parseInt(req.params.userId);

    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new HttpException("No user", 404);
    }

    res.json({ ...user, password: undefined });
  }
}

export const userController = new UserController(userRepository);
