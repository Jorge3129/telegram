export interface User {
  id: number;
  username: string;
  password: string;
  online?: boolean;
  socketId?: string;
}

export interface BasicUser {
  id: number;
  username: string;
}

export type UserKey = keyof User;
