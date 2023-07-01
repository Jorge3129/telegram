import { mockMessages } from "../mocks/mock.messages";
import { BaseRepository } from "../shared/base-repository";
import { Message } from "./models/message.type";

export class MessagesRepository extends BaseRepository<Message> {
  protected rows: Message[] = [];

  constructor() {
    super();

    this.saveMany(mockMessages);
  }

  public updateSeen(username: string, { chatId, timestamp, author }: Message) {
    if (username === author) {
      return;
    }

    const matchingMessages = this.rows.filter(
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
