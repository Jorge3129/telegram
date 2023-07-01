export interface User {
  username: string;
  password: string;
  online?: boolean;
  id: number;
  socketId?: string;
}
