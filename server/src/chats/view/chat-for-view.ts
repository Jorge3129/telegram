import { Message } from '../../messages/models/message.type';
import { ChatType } from '../entity/chat.entity';

export interface ChatForView {
  id: number;
  unread: number;
  title: string;
  lastMessage?: Message;
  muted: boolean;
  type: ChatType;
  online?: boolean;
}
