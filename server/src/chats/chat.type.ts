import { Message } from "../messages/models/message.type";

export interface Chat {
  id: number;
  members: ChatUser[];
  type: "personal" | "group";
  title?: string;
}

export interface PersonalChat extends Chat {
  members: [ChatUser, ChatUser];
}

export interface GroupChat extends Chat {}

/**
 * User info stored in a main-chat
 */
export interface ChatUser {
  username: string;
  lastRead: string;
  muted: boolean;
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
