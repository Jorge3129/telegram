import { Message } from "../../messages/models/message.model";

export enum ChatType {
  PERSONAL = "personal",
  GROUP = "group",
  CHANNEL = "channel",
}

export interface Chat {
  id: number;
  unread: number;
  title: string;
  lastMessage?: Message;
  muted: boolean;
  type: ChatType;
  online?: boolean;
}
