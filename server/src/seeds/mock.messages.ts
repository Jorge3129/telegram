import { Message } from "../messages/models/message.type";

export const mockMessages: (Omit<Message, "authorId" | "id"> & {
  id: number;
})[] = [
  {
    text: "yo",
    timestamp: "2022-03-19T00:20:46+02:00",
    author: "a",
    chatId: 1,
    id: 0,
    seen: true,
  },
  {
    text: "React can be used as a base in the development of single-page, mobile, or server-rendered applications with frameworks like Next.js.",
    timestamp: "2022-03-19T00:50:46+02:00",
    author: "a",
    chatId: 1,
    id: 1,
    seen: true,
  },
];
