import { Router } from 'express';
import { chatsController } from './chats.controller';

export const chatsRouter = Router();

chatsRouter.get('/', chatsController.getChats);
chatsRouter.get('/:chatId/messages', chatsController.getMessages);
