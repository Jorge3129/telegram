import { ChatsService } from './chats.service';
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ChatForView } from './view/chat-for-view';
import { Message } from '../messages/models/message.type';
import { MessageQueryService } from '../messages/queries/message-query.service';
import { RequestUser } from '../users/decorators/user.decorator';
import { UserEntity } from '../users/entity/user.entity';

@ApiTags('Chats')
@Controller('chats')
export class ChatsController {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly messageQueryService: MessageQueryService,
  ) {}

  @Get('/')
  @ApiBearerAuth()
  public getChats(@RequestUser() user: UserEntity): Promise<ChatForView[]> {
    return this.chatsService.getUserChats(user);
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
