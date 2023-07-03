import { Message } from "../models/message.type";
import {
  MessageContentEntity,
  isMediaContent,
  isTextContent,
} from "./message-content.entity";
import { MessageEntity } from "./message.entity";

export const messageToModel = (entity: MessageEntity): Message => {
  return {
    ...entity,
    text: isTextContent(entity.content) ? entity.content.textContent : "",
    author: entity.author.username,
    media: getMedia(entity.content),
    seen: !!entity.reads?.find((read) => read.userId !== entity.authorId),
    seenBy: entity.reads
      ?.filter((read) => read.userId !== entity.authorId)
      .map((read) => read.userId),
  };
};

const getMedia = (
  content: MessageContentEntity
): { filename: string; type: string } | undefined => {
  if (!isMediaContent(content)) {
    return undefined;
  }

  const firstFile = content.media[0];

  return {
    filename: firstFile.fileName,
    type: firstFile.mimeType,
  };
};
