import { User } from "../users/user.type";

export const mockUsersMap = {
  a: {
    id: 1,
    username: "a",
    password: "a",
    online: false,
  },
  b: {
    id: 2,
    username: "b",
    password: "b",
    online: false,
  },
  c: {
    id: 3,
    username: "c",
    password: "c",
    online: false,
  },
  JimMorrison: {
    id: 4,
    username: "Jim Morrison",
    password: "a",
    online: false,
  },
  PaulMcCartney: {
    id: 5,
    username: "Paul McCartney",
    password: "a",
    online: false,
  },
  Leonid: {
    id: 6,
    username: "Leonid",
    password: "1234",
    online: false,
  },
  Alexander: {
    id: 7,
    username: "Alexander",
    password: "1234",
    online: false,
  },
  George: {
    id: 8,
    username: "George",
    password: "1234",
    online: false,
  },
  Michael: {
    id: 9,
    username: "Michael",
    password: "1234",
    online: false,
  },
  Denis: {
    id: 11,
    username: "Denis",
    password: "1234",
    online: false,
  },
  Jorge: {
    id: 12,
    username: "Jorge",
    password: "a",
    online: false,
  },
  Heorhii: {
    id: 13,
    username: "Heorhii",
    password: "a",
    online: false,
  },
  Sanchez: { id: 14, username: "Sanchez", password: "a", online: false },
  Sanya: {
    id: 15,
    username: "Sanya",
    password: "a",
    online: false,
  },
  Vladyslav: {
    id: 16,
    username: "Vladyslav",
    password: "a",
    online: false,
  },
  Vlaad: {
    id: 17,
    username: "Vlaad",
    password: "a",
    online: false,
  },
  Artem: {
    id: 18,
    username: "Artem",
    password: "a",
    online: false,
  },
  Chris: {
    id: 19,
    username: "Chris",
    password: "a",
    online: false,
  },
  FatRat: {
    id: 20,
    username: "FatRat",
    password: "a",
    online: false,
  },
} as const;

export const mockUsers: User[] = Object.values(mockUsersMap);
