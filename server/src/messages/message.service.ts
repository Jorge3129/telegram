import { Injectable } from '@nestjs/common';
import { MessagesRepository } from './message.repository';
import { Message } from './models/message.type';
import { messageToModel } from './entity/utils';
import { User } from '../users/user.type';

@Injectable()
export class MessageService {
  constructor(private readonly messageRepo: MessagesRepository) {}

  public async create(message: Message, user: User): Promise<Message> {
    const savedMessage = await this.messageRepo.saveFromDto(message);

    await this.messageRepo.updateSeen(user.id, message);

    return messageToModel(savedMessage);
  }

  public countUnreadsForChat(chatId: number, userId: number): Promise<number> {
    return this.messageRepo.countUnreadMessages(chatId, userId);
  }

  public async updateSeenStatus(readByUserId: number, message: Message) {
    await this.messageRepo.updateSeen(readByUserId, message);
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
