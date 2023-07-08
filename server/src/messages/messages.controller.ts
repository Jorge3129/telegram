import {
  Controller,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { RequestUser } from 'src/users/decorators/user.decorator';
import { UserEntity } from 'src/users/entity/user.entity';

import { Message } from './models/message.type';
import { UserService } from 'src/users/user.service';
import { MessageService } from './message.service';
import { MessagesGateway } from 'src/socket/messages.gateway';
import { MessageReadsService } from './services/message-reads.service';
import { EditMessageDto } from './dto/edit-message.dto';
import { EditMessageService } from './services/edit-message.service';

@Controller('messages')
export class MessagesController {
  constructor(
    private messageService: MessageService,
    private messageReadsService: MessageReadsService,
    private userService: UserService,
    private messagesGateway: MessagesGateway,
    private editMessageService: EditMessageService,
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

  @Patch(':id')
  public async edit(
    @Param('id') messageId: string,
    @Body() dto: EditMessageDto,
    @RequestUser() user: UserEntity,
  ): Promise<void> {
    await this.editMessageService.editMessage(messageId, dto, user);
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
    await this.messageReadsService.updateSeen(user.id, message);

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
