import { Message, isGifMessage, isPollMessage } from "../models/message.model";

export const getMessageText = (message: Message): string => {
  if (isPollMessage(message)) {
    return `*Poll* ${message.poll.question}`;
  }

  if (isGifMessage(message)) {
    return `*Gif*`;
  }

  const bits = [message.text];

  if (message.media.length) {
    bits.unshift(`*Media*`);
  }

  return bits.join(" ");
};
