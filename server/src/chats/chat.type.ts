import { ChatUser } from '../chat-users/chat-user.type';
import { Message } from '../messages/models/message.type';
import { ChatType } from './entity/chat.entity';

export interface Chat {
  id: number;
  members: ChatUser[];
  type: ChatType;
  title?: string;
}

export interface ChatForView {
  id: number;
  unread: number;
  title: string;
  lastMessage?: Message;
  muted: boolean;
  type: ChatType;
  online?: boolean;
}
