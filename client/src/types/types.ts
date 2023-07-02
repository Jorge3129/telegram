export interface IMessage {
  id: string;
  text: string;
  timestamp: string;
  author: string;
  authorId: number;
  chatId: number;
  seen?: boolean;
  seenBy?: string[];
  media?: IMedia;
}

export type CreateMessageDto = Omit<IMessage, "id">;

export interface IMedia {
  filename: string;
  type: string;
  src?: string;
}

export interface IUser {
  username: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  password: string;
}

export interface IChat {
  id: number;
  unread: number;
  title: string;
  lastMessage?: IMessage;
  muted: boolean;
  type: "personal" | "group";
  online?: boolean;
}

export type IContextMenu = { x: number; y: number; messageId: string } | null;
