import { Request, Response, Router } from "express";
import { chatsService } from "../chats/chats.service";
import { messageService } from "../messages/message.service";

export const chatsRouter = Router();

chatsRouter.get("/messages/:chatId", async (req: Request, res: Response) => {
  const chatId = parseInt(req.params.chatId);
  const messages = await messageService.getMessagesByChat(chatId);
  res.json(messages);
});

chatsRouter.get("/chats/:user", async (req: Request, res: Response) => {
  const chats = await chatsService.getUserChats(req.params.user);

  res.json(chats);
});
