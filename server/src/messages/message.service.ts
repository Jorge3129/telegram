import { Injectable } from '@nestjs/common';
import { Message } from './models/message.type';
import { User } from '../users/user.type';
import { UserEntity } from 'src/users/entity/user.entity';

import { MessageMutationService } from './mutations/message-mutation.service';
import { EditMessageDto } from './dto/edit-message.dto';
import { CreateMessageDto } from './dto/create-message/create-message.dto';

@Injectable()
export class MessageService {
  constructor(private messageMutationService: MessageMutationService) {}

  public async create(message: CreateMessageDto, user: User): Promise<Message> {
    return this.messageMutationService.create(message, user);
  }

  public async delete(messageId: string, user: User): Promise<void> {
    await this.messageMutationService.delete(messageId, user);
  }

  public async readMessage(messageId: string, user: UserEntity): Promise<void> {
    await this.messageMutationService.readMessage(messageId, user);
  }

  public async editMessage(
    messageId: string,
    dto: EditMessageDto,
    user: User,
  ): Promise<void> {
    await this.messageMutationService.editMessage(messageId, dto, user);
  }
}
