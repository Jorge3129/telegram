import { Controller, Post, Body, Put, Delete, Param } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { RequestUser } from 'src/users/decorators/user.decorator';
import { UserEntity } from 'src/users/entity/user.entity';

import { Message } from './models/message.type';
import { UserService } from 'src/users/user.service';
import { MessageService } from './message.service';
import { MessagesGateway } from 'src/socket/messages.gateway';

@Controller('messages')
export class MessagesController {
  constructor(
    private messageService: MessageService,
    private userService: UserService,
    private messagesGateway: MessagesGateway,
  ) {}

  @Post()
  public async create(
    @Body() messageDto: CreateMessageDto,
    @RequestUser() user: UserEntity,
  ): Promise<Message> {
    const messageResponse = await this.messageService.create(messageDto, user);

    await this.messagesGateway.sendMessageToRecipients(
      messageDto.chatId,
      user.id,
      'message-to-client',
      messageResponse,
    );

    return messageResponse;
  }

  @Delete(':id')
  public async delete(
    @Param('id') messageId: string,
    @RequestUser() user: UserEntity,
  ): Promise<void> {
    const deletedMessage = await this.messageService.delete(messageId, user);

    await this.messagesGateway.sendMessageToRecipients(
      deletedMessage.chatId,
      user.id,
      'message-deleted',
      messageId,
    );
  }

  @Put()
  public async updateMessageReads(
    @Body() message: Message,
    @RequestUser() user: UserEntity,
  ) {
    await this.messageService.updateSeenStatus(user.id, message);

    const authorSocketId = await this.userService.getUserSocketId(
      message.authorId,
    );

    if (!authorSocketId) {
      return;
    }

    this.messagesGateway.emitEventTo(authorSocketId, 'seen', {
      message,
      userId: user.id,
    });
  }
}
