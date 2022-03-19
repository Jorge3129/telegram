const dayjs = require("dayjs");

export interface IUser {
    username: string;
    password: string;
    online?: boolean;
    id?: string;
}

export interface IMessage {
    text: string;
    timestamp: string;
    author: string;
    chatId?: number
}

export interface IChat {
    id: number
    members: { username: string, unread?: number }[],
}

export interface IClientChat {
    id: number
    unread: number;
    timestamp: string;
    title: string;
}
