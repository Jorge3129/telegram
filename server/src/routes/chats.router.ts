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
  const user = await userRepository.findOne({
    id: parseInt(req.params.userId),
  });

  if (!user) {
    throw new Error("NO such user");
  }

  const chats = await chatsService.getUserChats(user?.username);

  res.json(chats);
});
