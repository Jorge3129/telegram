import { mockMessages } from "../mocks/mock.messages";
import { Message } from "./models/message.type";

export class MessagesRepository {
  private readonly messages: Message[] = [];
  private idSequence = 0;

  constructor() {
    this.messages.push(...mockMessages);
  }

  public async save(messageDto: Omit<Message, "id">): Promise<Message> {
    const savedMessage = { ...messageDto, id: ++this.idSequence };

    this.messages.push(savedMessage);

    return savedMessage;
  }

  public async findOne(
    predicate: (chat: Message) => boolean
  ): Promise<Message | null> {
    return this.messages.find(predicate) ?? null;
  }

  public async find(predicate: (chat: Message) => boolean): Promise<Message[]> {
    return this.messages.filter(predicate);
  }

  public updateSeen(username: string, { chatId, timestamp, author }: Message) {
    if (username === author) {
      return;
    }

    const matchingMessages = this.messages.filter(
      (m) =>
        m.chatId === chatId &&
        new Date(m.timestamp) <= new Date(timestamp) &&
        m.author === author
    );

    matchingMessages.forEach((m) => {
      m.seen = true;

      if (!m.seenBy) {
        m.seenBy = [username];
      }

      if (!m.seenBy.includes(username)) {
        m.seenBy.push(username);
      }
    });
  }
}

export const messagesRepo = new MessagesRepository();
