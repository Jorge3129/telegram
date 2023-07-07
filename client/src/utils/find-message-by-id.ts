import { Message } from "../messages/models/message.model";

export const findMessageById = (
  messageId: string,
  chatId: number,
  messages: Message[]
): Message | undefined => {
  return messages
    .filter((msg) => msg.chatId === chatId)
    .find((msg) => msg.id === messageId);
};
