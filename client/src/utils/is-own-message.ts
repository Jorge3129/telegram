import { Message } from "../messages/models/message.model";
import { User } from "../users/models/user.model";

export const isOwnMessage = (message: Message, user: User | null): boolean => {
  return message && message.authorId === user?.id;
};
