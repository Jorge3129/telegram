import { Message } from "../../messages/models/message.model";

export interface Chat {
  id: number;
  unread: number;
  title: string;
  lastMessage?: Message;
  muted: boolean;
  type: "personal" | "group";
  online?: boolean;
}
