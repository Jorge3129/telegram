export interface IUser {
    username: string;
    password: string;
    online?: boolean;
    id: number;
    socketId?: string;
}

export interface IMessage {
    text: string;
    timestamp: string;
    author: string;
    chatId: number;
    messageId: number;
}

export interface IChat {
    id: number
    members: { username: string, lastRead: string, muted: boolean}[],
}

/**
 * User info stored in a chat
 */
export interface IChatUser {
    username: string;
    lastMessage: string;
}

export interface IClientChat {
    id: number
    unread: number;
    title: string;
    lastMessage: IMessage;
    muted: boolean
}
