import { ChatUserEntity } from "../chat-users/entity/chat-user.entity";
import {
  ChatEntity,
  ChatType,
  GroupChatEntity,
} from "../chats/entity/chat.entity";

export const mockChats: ChatEntity[] = [
  {
    id: 1,
    members: [],
    type: ChatType.PERSONAL,
  },
  <GroupChatEntity>{
    id: 2,
    members: [],
    title: "GIJ",
    type: ChatType.GROUP,
  },
];
