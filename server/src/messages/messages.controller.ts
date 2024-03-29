import { Controller, Post, Body, Delete, Param, Patch } from '@nestjs/common';

import { Message } from './models/message.type';
import { MessageService } from './message.service';
import { EditMessageDto } from './dto/edit-message.dto';
import { CreateMessageDto } from './dto/create-message/create-message.dto';
import { CreateMessageValidationPipe } from './dto/create-message/create-message-validation.pipe';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTextMessageDto } from './dto/create-message/create-text-message.dto';
import { CreateGifMessageDto } from './dto/create-message/create-gif-message.dto';
import { createMessageDtoExamples } from './dto/create-message/create-message.dto.examples';
import { createMessageSchema } from './dto/create-message/create-message-schema';
import { CreatePollMessageDto } from './dto/create-message/create-poll-message.dto';
import { RequestUser } from '../users/decorators/user.decorator';
import { UserEntity } from '../users/entity/user.entity';

@ApiTags('Messages')
@Controller('messages')
export class MessagesController {
  constructor(private messageService: MessageService) {}

  @Post()
  @ApiExtraModels(
    CreateTextMessageDto,
    CreateGifMessageDto,
    CreatePollMessageDto,
  )
  @ApiBody({
    schema: createMessageSchema,
    examples: createMessageDtoExamples,
  })
  @ApiBearerAuth()
  public async create(
    @Body(CreateMessageValidationPipe) messageDto: CreateMessageDto,
    @RequestUser() user: UserEntity,
  ): Promise<Message> {
    return this.messageService.create(messageDto, user);
  }

  @Patch(':id')
  @ApiBearerAuth()
  public async edit(
    @Param('id') messageId: string,
    @Body() dto: EditMessageDto,
    @RequestUser() user: UserEntity,
  ): Promise<void> {
    await this.messageService.editMessage(messageId, dto, user);
  }

  @Delete(':id')
  @ApiBearerAuth()
  public async delete(
    @Param('id') messageId: string,
    @RequestUser() user: UserEntity,
  ): Promise<void> {
    await this.messageService.delete(messageId, user);
  }
}
