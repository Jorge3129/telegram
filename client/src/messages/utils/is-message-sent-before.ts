import { Message } from "../models/message.model";

export const isMessageSentBefore = (
  message1: Message,
  message2: Message
): boolean => {
  return new Date(message1.timestamp) <= new Date(message2.timestamp);
};
