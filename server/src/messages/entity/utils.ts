import { Message } from "../models/message.type";
import { isTextContent } from "./message-content.entity";
import { MessageEntity } from "./message.entity";

export const messageToModel = (entity: MessageEntity): Message => {
  return {
    ...entity,
    text: isTextContent(entity.content) ? entity.content.textContent : "",
    author: entity.author.username,
  };
};
