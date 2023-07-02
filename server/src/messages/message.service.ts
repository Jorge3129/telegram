import dayjs from "dayjs";
import { MessagesRepository, messagesRepo } from "./message.repository";
import { Message } from "./models/message.type";
import { messageToModel } from "./entity/utils";

export class MessageService {
  constructor(private readonly messageRepo: MessagesRepository) {}

  public async getMessagesByChat(chatId: number): Promise<Message[]> {
    const messages = await this.messageRepo.findBy({ chatId });

    // TODO order by
    return messages
      .sort((a, b) =>
        Math.sign(dayjs(a.timestamp).diff(dayjs(b.timestamp), "millisecond"))
      )
      .map(messageToModel);
  }
}

export const messageService = new MessageService(messagesRepo);
