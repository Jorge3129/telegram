import { Request, Response } from "express";
import { UserRepository, userRepository } from "./user.repository";
import { ExpressHandler } from "../shared/decorators/express-handler.decorator";

export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  @ExpressHandler()
  public async getUser(req: Request, res: Response) {
    const userId = parseInt(req.params.userId);

    const user = await this.userRepository.findOne({ id: userId });

    if (!user) {
      throw new Error("No user");
    }

    res.json({ ...user, password: undefined });
  }
}

export const userController = new UserController(userRepository);
