import { type } from "os";

export interface User {
  username: string;
  password: string;
  online?: boolean;
  id: number;
  socketId?: string;
}

export type UserKey = keyof User;
