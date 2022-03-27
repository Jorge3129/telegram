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
    seen?: boolean
    seenBy?: string[]
    media?: IMedia
}

export interface IMedia {
    filename: string;
    type: string,
}

export interface IPersonalMessage extends IMessage {

}

export interface IGroupMessage extends IMessage {
    seenBy?: string[]
}

export interface IChat {
    id: number
    members: IChatUser[],
    type: 'personal' | 'group'
    title?: string
}

export interface IPersonalChat extends IChat {
    members: [IChatUser, IChatUser],
}

export interface IGroupChat extends IChat {
}

/**
 * User info stored in a main-chat
 */
export interface IChatUser {
    username: string,
    lastRead: string,
    muted: boolean
}

export interface IClientChat {
    id: number
    unread: number;
    title: string;
    lastMessage: IMessage;
    muted: boolean
    type: 'personal' | 'group'
    online?: boolean
}
