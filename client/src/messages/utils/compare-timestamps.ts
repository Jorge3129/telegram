import { Message } from "../models/message.model";

export const compareTimestamps = (a: string, b: string): number => {
  return new Date(a).valueOf() - new Date(b).valueOf();
};

export const compareMessageTimestamps = (a: Message, b: Message): number => {
  return new Date(a.timestamp).valueOf() - new Date(b.timestamp).valueOf();
};
