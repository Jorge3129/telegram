export interface Message {
  id: string;
  text: string;
  timestamp: string;
  author: string;
  authorId: number;
  chatId: number;
  seen?: boolean;
  seenBy?: string[];
  media?: Media;
}

export type CreateMessageDto = Omit<Message, "id">;

export interface Media {
  filename: string;
  type: string;
  src?: string;
}

export interface User {
  id: number;
  username: string;
  password: string;
}

export interface Chat {
  id: number;
  unread: number;
  title: string;
  lastMessage?: Message;
  muted: boolean;
  type: "personal" | "group";
  online?: boolean;
}

export type IContextMenu = { x: number; y: number; messageId: string } | null;
