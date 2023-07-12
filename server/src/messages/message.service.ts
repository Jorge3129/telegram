import { Injectable } from '@nestjs/common';
import { Message } from './models/message.type';
import { User } from '../users/user.type';
import { CreateMessageDto } from './dto/create-message.dto';
import { UserEntity } from 'src/users/entity/user.entity';

import { CreateGifMessageDto } from './dto/create-gif-message.dto';
import { MessageMutationService } from './mutations/message-mutation.service';
import { EditMessageDto } from './dto/edit-message.dto';

@Injectable()
export class MessageService {
  constructor(private messageMutationService: MessageMutationService) {}

  public async create(
    message: CreateMessageDto | CreateGifMessageDto,
    user: User,
  ): Promise<Message> {
    return this.messageMutationService.create(message, user);
  }

  public async delete(messageId: string, user: User): Promise<void> {
    await this.messageMutationService.delete(messageId, user);
  }

  public async readMessage(message: Message, user: UserEntity): Promise<void> {
    await this.messageMutationService.readMessage(message, user);
  }

  public async editMessage(
    messageId: string,
    dto: EditMessageDto,
    user: User,
  ): Promise<void> {
    await this.messageMutationService.editMessage(messageId, dto, user);
  }
}
