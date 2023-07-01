import { ChatUser } from "../chat-users/chat-user.type";
import { Message } from "../messages/models/message.type";

export interface Chat {
  id: number;
  members: ChatUser[];
  type: "personal" | "group";
  title?: string;
}

export interface ChatForView {
  id: number;
  unread: number;
  title: string;
  lastMessage: Message;
  muted: boolean;
  type: "personal" | "group";
  online?: boolean;
}
