import { Chat } from "../chats/chat.type";
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
    type: "personal",
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
    type: "group",
  },
  // {
  //   id: 2,
  //   members: [
  //     {
  //       user: mockUsersMap.a,
  //       lastRead: "2022-03-20T15:10:46+02:00",
  //       muted: true,
  //     },
  //     {
  //       user: mockUsersMap.c,
  //       lastRead: "2022-03-20T14:40:46+02:00",
  //       muted: true,
  //     },
  //   ],
  //   type: "personal",
  // },
  // {
  //   id: 3,
  //   members: [
  //     {
  //       user: mockUsersMap.b,
  //       lastRead: "2022-03-22T00:00:46+02:00",
  //       muted: true,
  //     },
  //     {
  //       user: mockUsersMap.c,
  //       lastRead: "2022-03-22T00:30:46+02:00",
  //       muted: true,
  //     },
  //   ],
  //   type: "personal",
  // },
  // {
  //   id: 4,
  //   members: [
  //     {
  //       user: mockUsersMap.a,
  //       lastRead: "2022-03-23T09:50:46+02:00",
  //       muted: true,
  //     },
  //     {
  //       user: mockUsersMap.JimMorrison,
  //       lastRead: "2022-03-23T09:20:46+02:00",
  //       muted: true,
  //     },
  //   ],
  //   type: "personal",
  // },
  // {
  //   id: 5,
  //   members: [
  //     {
  //       user: mockUsersMap.a,
  //       lastRead: "2022-03-24T18:10:46+02:00",
  //       muted: true,
  //     },
  //     {
  //       user: mockUsersMap.PaulMcCartney,
  //       lastRead: "2022-03-24T19:10:46+02:00",
  //       muted: true,
  //     },
  //   ],
  //   type: "personal",
  // },
  // {
  //   id: 6,
  //   members: [
  //     {
  //       user: mockUsersMap.a,
  //       lastRead: "2022-03-24T18:10:46+02:00",
  //       muted: true,
  //     },
  //     {
  //       user: mockUsersMap.b,
  //       lastRead: "2022-03-24T19:10:46+02:00",
  //       muted: true,
  //     },
  //     {
  //       user: mockUsersMap.PaulMcCartney,
  //       lastRead: "2022-03-24T19:10:46+02:00",
  //       muted: true,
  //     },
  //   ],
  //   type: "group",
  //   title: "GIJ",
  // },
];
