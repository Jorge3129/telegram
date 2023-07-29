import { maxWith } from "../../shared/utils/max-with";
import { Message } from "../models/message.model";
import { compareMessageTimestamps } from "./compare-timestamps";

export const findLatestMessage = (messages: Message[]): Message | undefined => {
  return maxWith(messages, compareMessageTimestamps);
};
