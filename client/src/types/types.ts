export interface IMessage {
    text: string;
    timestamp: string;
    author: string;
    chatId?: number
}

export interface IUser {
    username: string;
    password: string;
}

export interface IChat {
    id: number
    unread: number;
    timestamp: string;
    title: string;
}
