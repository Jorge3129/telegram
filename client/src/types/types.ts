export interface IMessage {
    text: string;
    timestamp: string;
    author: string;
    chatId: number
    messageId: number;
}

export interface IUser {
    username: string;
    password: string;
}

export interface IChat {
    id: number
    unread: number;
    title: string;
    lastMessage: IMessage;
    muted: boolean;
}
