export interface IMessage {
  id: number;
  text: string;
  timestamp: string;
  author: string;
  chatId: number;
  seen?: boolean;
  seenBy?: string[];
  media?: IMedia;
}

export interface IMedia {
  filename: string;
  type: string;
  src?: string;
}

export interface IUser {
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

export type IContextMenu = { x: number; y: number; messageId: number } | null;
