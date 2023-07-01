import { BaseRepository } from "../shared/base-repository";
import { Message } from "./models/message.type";

export class MessagesRepository extends BaseRepository<Message> {
  protected rows: Message[] = [];

  constructor() {
    super();
  }

  public updateSeen(userId: number, message: Message) {
    if (userId === message.authorId) {
      return;
    }

    const matchingMessages = this.rows.filter(
      (m) =>
        m.chatId === message.chatId &&
        new Date(m.timestamp) <= new Date(message.timestamp) &&
        m.author === message.author
    );

    matchingMessages.forEach((m) => {
      m.seen = true;

      if (!m.seenBy) {
        m.seenBy = [userId];
      }

      if (!m.seenBy.includes(userId)) {
        m.seenBy.push(userId);
      }
    });
  }
}

export const messagesRepo = new MessagesRepository();
