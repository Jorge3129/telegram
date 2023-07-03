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

export type IContextMenu = { x: number; y: number; messageId: string } | null;
