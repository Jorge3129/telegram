import { Router } from 'express';
import { userController } from '../users/user.controller';

export const userRouter = Router();

userRouter.get('/:userId', userController.getUser);
