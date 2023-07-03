import dayjs from "dayjs";
import { MessagesRepository, messagesRepo } from "./message.repository";
import { Message } from "./models/message.type";
import { messageToModel } from "./entity/utils";
import { chatUserRepository } from "../chat-users/chat-user.repository";
import { User } from "../users/user.type";

export class MessageService {
  constructor(private readonly messageRepo: MessagesRepository) {}

  public async create(message: Message, user: User): Promise<Message> {
    const savedMessage = await messagesRepo.saveFromDto(message);

    await chatUserRepository.updateLastRead(
      user.id,
      message.chatId,
      message.timestamp
    );

    await messagesRepo.updateSeen(user.id, message);

    return messageToModel(savedMessage);
  }

  public async getMessagesForChat(chatId: number): Promise<Message[]> {
    const messages = await this.messageRepo.getMessagesForChat(chatId);

    return messages.map(messageToModel);
  }
}

export const messageService = new MessageService(messagesRepo);
