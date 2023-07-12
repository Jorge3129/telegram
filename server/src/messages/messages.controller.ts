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
import { MessageService } from './message.service';
import { EditMessageDto } from './dto/edit-message.dto';
import { CreateGifMessageDto } from './dto/create-gif-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private messageService: MessageService) {}

  @Post()
  public async create(
    @Body() messageDto: CreateMessageDto,
    @RequestUser() user: UserEntity,
  ): Promise<Message> {
    return this.messageService.create(messageDto, user);
  }

  @Post('gif')
  public async createGif(
    @Body() messageDto: CreateGifMessageDto,
    @RequestUser() user: UserEntity,
  ): Promise<Message> {
    return this.messageService.create(messageDto, user);
  }

  @Patch(':id')
  public async edit(
    @Param('id') messageId: string,
    @Body() dto: EditMessageDto,
    @RequestUser() user: UserEntity,
  ): Promise<void> {
    await this.messageService.editMessage(messageId, dto, user);
  }

  @Delete(':id')
  public async delete(
    @Param('id') messageId: string,
    @RequestUser() user: UserEntity,
  ): Promise<void> {
    await this.messageService.delete(messageId, user);
  }

  @Put()
  public async updateMessageReads(
    @Body() message: Message,
    @RequestUser() user: UserEntity,
  ) {
    await this.messageService.readMessage(message, user);
  }
}
