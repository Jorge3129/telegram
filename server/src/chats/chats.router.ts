import { Router } from "express";
import { chatsController } from "./chats.controller";

export const chatsRouter = Router();

chatsRouter.get("/chats/:chatId/messages", chatsController.getMessages);
chatsRouter.get("/chats/:userId", chatsController.getChats);
