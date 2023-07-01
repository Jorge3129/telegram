import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { userRepository } from "../users/user.repository";

export const authRouter = Router();

authRouter.post("/login", authController.login);
authRouter.post("/register", authController.register);
authRouter.get("/users/:userId", async (req, res, next) => {
  const userId = parseInt(req.params.userId);

  const user = await userRepository.findOne({ id: userId });

  if (!user) {
    next(new Error("No user"));
  }

  res.json({ ...user, password: undefined });
});
