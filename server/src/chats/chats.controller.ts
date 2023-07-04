import { Request } from 'express';
import { ChatsService } from './chats.service';
import { MessageService } from '../messages/message.service';
import { User } from '../users/user.type';
import { Controller, Get, Param, ParseIntPipe, Req } from '@nestjs/common';
import { ChatForView } from './chat.type';
import { Message } from 'src/messages/models/message.type';

@Controller('chats')
export class ChatsController {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly messageService: MessageService,
  ) {}

  @Get('/')
  public getChats(@Req() req: Request): Promise<ChatForView[]> {
    return this.chatsService.getUserChats(<User>req.user);
  }

  @Get('/:chatId/messages')
  public getMessages(
    @Param('chatId', ParseIntPipe) chatId: number,
  ): Promise<Message[]> {
    return this.messageService.getMessagesForChat(chatId);
  }
}
