export interface User {
  id: number;
  username: string;
  password: string;
  online?: boolean;
  socketId?: string;
}

export type UserKey = keyof User;
