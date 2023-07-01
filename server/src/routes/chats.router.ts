import { Request, Response, Router } from "express";
import { chatsService } from "../chats/chats.service";
import { messageService } from "../messages/message.service";
import { userRepository } from "../users/user.repository";

export const chatsRouter = Router();

chatsRouter.get("/messages/:chatId", async (req: Request, res: Response) => {
  const chatId = parseInt(req.params.chatId);
  const messages = await messageService.getMessagesByChat(chatId);
  res.json(messages);
});

chatsRouter.get("/chats/:userId", async (req: Request, res: Response) => {
  const chats = await chatsService.getUserChats(parseInt(req.params.userId));

  res.json(chats);
});
