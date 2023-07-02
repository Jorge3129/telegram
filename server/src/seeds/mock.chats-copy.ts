import { Chat } from "../chats/chat.type";
import { ChatType } from "../chats/entity/chat.entity";
import { User } from "../users/user.type";
import { mockUsersMap } from "./mock.users";

export const mockChats: (Omit<Chat, "members"> & {
  members: { user: User; lastRead: string; muted: boolean }[];
})[] = [
  {
    id: 1,
    members: [
      {
        user: mockUsersMap.a,
        lastRead: "2022-03-19T05:20:46+02:00",
        muted: false,
      },
      {
        user: mockUsersMap.b,
        lastRead: "2022-03-19T05:50:46+02:00",
        muted: true,
      },
    ],
    type: ChatType.PERSONAL,
  },
  {
    id: 2,
    members: [
      {
        user: mockUsersMap.a,
        lastRead: "2022-03-19T05:20:46+02:00",
        muted: false,
      },
      {
        user: mockUsersMap.b,
        lastRead: "2022-03-19T05:50:46+02:00",
        muted: true,
      },
      {
        user: mockUsersMap.JimMorrison,
        lastRead: "2022-03-19T05:50:46+02:00",
        muted: true,
      },
    ],
    title: "GIJ",
    type: ChatType.GROUP,
  },
];
