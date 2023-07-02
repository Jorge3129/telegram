import { Request, Response } from "express";
import { ChatsService, chatsService } from "./chats.service";
import { MessageService, messageService } from "../messages/message.service";
import { ExpressHandler } from "../shared/decorators/express-handler.decorator";

export class ChatsController {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly messageService: MessageService
  ) {}

  @ExpressHandler()
  public async getMessages(req: Request, res: Response) {
    const chatId = parseInt(req.params.chatId);

    const messages = await this.messageService.getMessagesByChat(chatId);

    res.json(messages);
  }

  @ExpressHandler()
  public async getChats(req: Request, res: Response) {
    const chats = await this.chatsService.getUserChats(
      parseInt(req.params.userId)
    );

    res.json(chats);
  }
}

export const chatsController = new ChatsController(
  chatsService,
  messageService
);