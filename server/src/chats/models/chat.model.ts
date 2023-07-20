import { ChatUser } from '../../chat-users/chat-user.type';
import { ChatType } from '../entity/chat.entity';

export interface Chat {
  id: number;
  members: ChatUser[];
  type: ChatType;
  title?: string;
}
