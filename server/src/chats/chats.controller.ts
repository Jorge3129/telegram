import { Request } from 'express';
import { ChatsService } from './chats.service';
import { User } from '../users/user.type';
import { Controller, Get, Param, ParseIntPipe, Req } from '@nestjs/common';
import { Message } from 'src/messages/models/message.type';
import { RequestUser } from 'src/users/decorators/user.decorator';
import { UserEntity } from 'src/users/entity/user.entity';
import { MessageQueryService } from 'src/messages/queries/message-query.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ChatForView } from './view/chat-for-view';

@ApiTags('Chats')
@Controller('chats')
export class ChatsController {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly messageQueryService: MessageQueryService,
  ) {}

  @Get('/')
  @ApiBearerAuth()
  public getChats(@Req() req: Request): Promise<ChatForView[]> {
    return this.chatsService.getUserChats(<User>req.user);
  }

  @Get('/:chatId/messages')
  @ApiBearerAuth()
  public getMessages(
    @Param('chatId', ParseIntPipe) chatId: number,
    @RequestUser() user: UserEntity,
  ): Promise<Message[]> {
    return this.messageQueryService.getMessagesForChat(chatId, user);
  }
}
