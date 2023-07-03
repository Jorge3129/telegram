export interface Media {
  filename: string;
  type: string;
  src?: string;
}

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
