import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MessagesRepository } from './services/message.repository';
import { Message } from './models/message.type';
import { messageToModel } from './entity/utils';
import { User } from '../users/user.type';
import { CreateMessageService } from './services/create-message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageEntity } from './entity/message.entity';
import { MessageReadsService } from './services/message-reads.service';

@Injectable()
export class MessageService {
  constructor(
    private messageRepo: MessagesRepository,
    private messageReadsService: MessageReadsService,
    private createMessageService: CreateMessageService,
  ) {}

  public async create(message: CreateMessageDto, user: User): Promise<Message> {
    const savedMessage = await this.createMessageService.saveFromDto(
      message,
      user,
    );

    await this.messageReadsService.updateSeen(user.id, message);

    return messageToModel(savedMessage);
  }

  public async delete(messageId: string, user: User): Promise<MessageEntity> {
    const message = await this.messageRepo.findOneBy({ id: messageId });

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    if (message.authorId !== user.id) {
      throw new ForbiddenException('Cannot delete this message');
    }

    await this.messageRepo.delete(messageId);

    return message;
  }

  public async getLatestChatMessage(chatId: number): Promise<Message | null> {
    const message = await this.messageRepo.getLatestMessage(chatId);

    if (!message) {
      return null;
    }

    return messageToModel(message);
  }

  public async getMessagesForChat(chatId: number): Promise<Message[]> {
    const messages = await this.messageRepo.getMessagesForChat(chatId);

    return messages.map(messageToModel);
  }
}
