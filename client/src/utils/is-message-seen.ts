import { Message } from "../messages/models/message.model";

export const isMessageSeen = (
  timestamp: string,
  unread: number,
  messages: Message[]
): boolean => {
  const lastMessageSeen = messages.at(-(unread + 1));

  if (!lastMessageSeen) {
    return false;
  }

  return new Date(lastMessageSeen.timestamp) >= new Date(timestamp);
};
