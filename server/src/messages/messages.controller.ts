import { Controller, Post, Body, Put } from '@nestjs/common';
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
  ): Promise<Message | null> {
    const messageResponse = await this.messageService.create(messageDto, user);

    await this.messagesGateway.sendMessageToRecipients(messageResponse);

    return messageResponse;
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
