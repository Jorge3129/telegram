import dayjs from "dayjs";
import { MessagesRepository, messagesRepo } from "./message.repository";
import { Message } from "./models/message.type";

export class MessageService {
  constructor(private readonly messageRepo: MessagesRepository) {}

  public async getMessagesByChat(chatId: number): Promise<Message[]> {
    const messages = await this.messageRepo.find((m) => m.chatId === chatId);

    return messages.sort((a, b) =>
      Math.sign(dayjs(a.timestamp).diff(dayjs(b.timestamp), "millisecond"))
    );
  }
}

export const messageService = new MessageService(messagesRepo);
