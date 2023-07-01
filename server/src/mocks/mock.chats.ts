import { PersonalChat, GroupChat } from "../chats/chat.type";

export const mockChats: (PersonalChat | GroupChat)[] = [
  {
    id: 1,
    members: [
      { username: "a", lastRead: "2022-03-19T05:20:46+02:00", muted: false },
      { username: "b", lastRead: "2022-03-19T05:50:46+02:00", muted: true },
    ],
    type: "personal",
  },
  {
    id: 2,
    members: [
      { username: "a", lastRead: "2022-03-20T15:10:46+02:00", muted: true },
      { username: "c", lastRead: "2022-03-20T14:40:46+02:00", muted: true },
    ],
    type: "personal",
  },
  {
    id: 3,
    members: [
      { username: "b", lastRead: "2022-03-22T00:00:46+02:00", muted: true },
      { username: "c", lastRead: "2022-03-22T00:30:46+02:00", muted: true },
    ],
    type: "personal",
  },
  {
    id: 4,
    members: [
      { username: "a", lastRead: "2022-03-23T09:50:46+02:00", muted: true },
      {
        username: "Jim Morrison",
        lastRead: "2022-03-23T09:20:46+02:00",
        muted: true,
      },
    ],
    type: "personal",
  },
  {
    id: 5,
    members: [
      { username: "a", lastRead: "2022-03-24T18:10:46+02:00", muted: true },
      {
        username: "Paul McCartney",
        lastRead: "2022-03-24T19:10:46+02:00",
        muted: true,
      },
    ],
    type: "personal",
  },
  {
    id: 16,
    members: [
      { username: "a", lastRead: "2022-03-24T18:10:46+02:00", muted: true },
      { username: "b", lastRead: "2022-03-24T19:10:46+02:00", muted: true },
      {
        username: "Paul McCartney",
        lastRead: "2022-03-24T19:10:46+02:00",
        muted: true,
      },
    ],
    type: "group",
    title: "GIJ",
  },
  {
    id: 11,
    members: [
      { username: "b", lastRead: "2022-03-13T10:16:35+02:00", muted: false },
      {
        username: "Jim Morrison",
        lastRead: "2011-10-05T14:48:00+02:00",
        muted: true,
      },
    ],
    type: "personal",
  },
  {
    id: 12,
    members: [
      { username: "b", lastRead: "2022-03-13T10:16:35+02:00", muted: false },
      {
        username: "Paul McCartney",
        lastRead: "2011-10-05T14:48:00+02:00",
        muted: true,
      },
    ],
    type: "personal",
  },
  {
    id: 13,
    members: [
      { username: "c", lastRead: "2022-03-13T10:16:35+02:00", muted: false },
      {
        username: "Jim Morrison",
        lastRead: "2011-10-05T14:48:00+02:00",
        muted: true,
      },
    ],
    type: "personal",
  },
  {
    id: 14,
    members: [
      { username: "c", lastRead: "2022-03-13T10:16:35+02:00", muted: false },
      {
        username: "Paul McCartney",
        lastRead: "2011-10-05T14:48:00+02:00",
        muted: true,
      },
    ],
    type: "personal",
  },
  {
    id: 15,
    members: [
      {
        username: "Jim Morrison",
        lastRead: "2022-03-13T10:16:35+02:00",
        muted: false,
      },
      {
        username: "Paul McCartney",
        lastRead: "2011-10-05T14:48:00+02:00",
        muted: true,
      },
    ],
    type: "personal",
  },
  {
    id: 17,
    members: [
      {
        username: "Leonid",
        lastRead: "2022-03-13T10:16:35+02:00",
        muted: false,
      },
      {
        username: "George",
        lastRead: "2011-10-05T14:48:00+02:00",
        muted: true,
      },
    ],
    type: "personal",
  },
  {
    id: 18,
    members: [
      {
        username: "Alexander",
        lastRead: "2022-03-13T10:16:35+02:00",
        muted: false,
      },
      {
        username: "George",
        lastRead: "2011-10-05T14:48:00+02:00",
        muted: true,
      },
    ],
    type: "personal",
  },
  {
    id: 19,
    members: [
      {
        username: "Michael",
        lastRead: "2022-03-13T10:16:35+02:00",
        muted: false,
      },
      {
        username: "George",
        lastRead: "2011-10-05T14:48:00+02:00",
        muted: true,
      },
    ],
    type: "personal",
  },
  {
    id: 20,
    members: [
      {
        username: "Alexander",
        lastRead: "2022-03-13T10:16:35+02:00",
        muted: false,
      },
      { username: "a", lastRead: "2011-10-05T14:48:00+02:00", muted: true },
    ],
    type: "personal",
  },
  {
    id: 21,
    members: [
      {
        username: "Leonid",
        lastRead: "2022-03-13T10:16:35+02:00",
        muted: false,
      },
      { username: "a", lastRead: "2011-10-05T14:48:00+02:00", muted: true },
    ],
    type: "personal",
  },
  {
    id: 22,
    members: [
      {
        username: "Michael",
        lastRead: "2022-03-13T10:16:35+02:00",
        muted: false,
      },
      { username: "a", lastRead: "2011-10-05T14:48:00+02:00", muted: true },
    ],
    type: "personal",
  },
  {
    id: 23,
    members: [
      {
        username: "Denis",
        lastRead: "2022-03-13T10:16:35+02:00",
        muted: false,
      },
      { username: "Jorge", lastRead: "2011-10-05T14:48:00+02:00", muted: true },
    ],
    type: "personal",
  },
  {
    id: 24,
    members: [
      {
        username: "Jorge",
        lastRead: "2022-03-13T10:16:35+02:00",
        muted: false,
      },
      {
        username: "Heorhii",
        lastRead: "2011-10-05T14:48:00+02:00",
        muted: true,
      },
    ],
    type: "personal",
  },
  {
    id: 25,
    members: [
      {
        username: "Denis",
        lastRead: "2022-03-13T10:16:35+02:00",
        muted: false,
      },
      {
        username: "Heorhii",
        lastRead: "2011-10-05T14:48:00+02:00",
        muted: true,
      },
    ],
    type: "personal",
  },
  {
    id: 26,
    members: [
      {
        username: "Jorge",
        lastRead: "2022-03-13T10:16:35+02:00",
        muted: false,
      },
      {
        username: "Vladyslav",
        lastRead: "2011-10-05T14:48:00+02:00",
        muted: true,
      },
    ],
    type: "personal",
  },
  {
    id: 27,
    members: [
      {
        username: "Jorge",
        lastRead: "2022-03-13T10:16:35+02:00",
        muted: false,
      },
      { username: "Sanya", lastRead: "2011-10-05T14:48:00+02:00", muted: true },
    ],
    type: "personal",
  },
  {
    id: 28,
    members: [
      {
        username: "Jorge",
        lastRead: "2022-03-13T10:16:35+02:00",
        muted: false,
      },
      { username: "Vlaad", lastRead: "2011-10-05T14:48:00+02:00", muted: true },
    ],
    type: "personal",
  },
  {
    id: 29,
    members: [
      {
        username: "Jorge",
        lastRead: "2022-03-13T10:16:35+02:00",
        muted: false,
      },
      { username: "Chris", lastRead: "2011-10-05T14:48:00+02:00", muted: true },
    ],
    type: "personal",
  },
  {
    id: 30,
    members: [
      {
        username: "Jorge",
        lastRead: "2022-03-13T10:16:35+02:00",
        muted: false,
      },
      { username: "Artem", lastRead: "2011-10-05T14:48:00+02:00", muted: true },
    ],
    type: "personal",
  },
  {
    id: 31,
    members: [
      {
        username: "Jorge",
        lastRead: "2022-03-13T10:16:35+02:00",
        muted: false,
      },
      {
        username: "FatRat",
        lastRead: "2011-10-05T14:48:00+02:00",
        muted: true,
      },
    ],
    type: "personal",
  },
  {
    id: 32,
    members: [
      {
        username: "Sanya",
        lastRead: "2022-03-13T10:16:35+02:00",
        muted: false,
      },
      {
        username: "Vladyslav",
        lastRead: "2011-10-05T14:48:00+02:00",
        muted: true,
      },
    ],
    type: "personal",
  },
  {
    id: 33,
    members: [
      {
        username: "Sanya",
        lastRead: "2022-03-13T10:16:35+02:00",
        muted: false,
      },
      { username: "Vlaad", lastRead: "2011-10-05T14:48:00+02:00", muted: true },
    ],
    type: "personal",
  },
  {
    id: 34,
    members: [
      {
        username: "Vlaad",
        lastRead: "2022-03-13T10:16:35+02:00",
        muted: false,
      },
      {
        username: "Vlasyslav",
        lastRead: "2011-10-05T14:48:00+02:00",
        muted: true,
      },
    ],
    type: "personal",
  },
  {
    id: 35,
    members: [
      {
        username: "Sanya",
        lastRead: "2022-03-13T10:16:35+02:00",
        muted: false,
      },
      {
        username: "FatRat",
        lastRead: "2011-10-05T14:48:00+02:00",
        muted: true,
      },
    ],
    type: "personal",
  },
  {
    id: 36,
    members: [
      {
        username: "Artem",
        lastRead: "2022-03-13T10:16:35+02:00",
        muted: false,
      },
      {
        username: "Vladyslav",
        lastRead: "2011-10-05T14:48:00+02:00",
        muted: true,
      },
    ],
    type: "personal",
  },
  {
    id: 36,
    members: [
      {
        username: "Artem",
        lastRead: "2022-03-13T10:16:35+02:00",
        muted: false,
      },
      { username: "Sanya", lastRead: "2011-10-05T14:48:00+02:00", muted: true },
    ],
    type: "personal",
  },
  {
    id: 37,
    members: [
      { username: "Sanya", lastRead: "2022-03-24T18:10:46+02:00", muted: true },
      { username: "Vlaad", lastRead: "2022-03-24T19:10:46+02:00", muted: true },
      {
        username: "Vladyslav",
        lastRead: "2022-03-24T19:10:46+02:00",
        muted: true,
      },
      { username: "Jorge", lastRead: "2022-03-24T19:10:46+02:00", muted: true },
      { username: "Artem", lastRead: "2022-03-24T19:10:46+02:00", muted: true },
      {
        username: "FatRat",
        lastRead: "2022-03-24T19:10:46+02:00",
        muted: true,
      },
    ],
    type: "group",
    title: "Глисти з жопи ХХДД",
  },
];
