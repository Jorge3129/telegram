import {IChat, IChatUser, IClientChat, IMessage} from "../types/types";
import {getMessagesByChat, messagesGen} from "./messagesGen";
import {chats as chatsTemp} from "./chatsTemp";
import {users} from "./mock.users";

const dayjs = require('dayjs')

const getLastRead = (ch: IChat, user: IChatUser) => {
    const timestamp = getMessagesByChat(ch.id, messagesGen)
        .filter(msg => msg.author === user.username)
        .slice(-1).pop()?.timestamp;
    if (!timestamp) return null;
    return timestamp > user.lastRead ? timestamp : null;
}

const correctLastRead = (chats: IChat[]) => {
    return chats.map(ch => ({
        ...ch,
        members: ch.members.map(
            m => ({
                    ...m,
                    lastRead: getLastRead(ch, m) || m.lastRead
                }
            ))
    }))
}

export const chats: IChat[] = correctLastRead(chatsTemp);

const correctSeenMessages = (messages: IMessage[]) => {
    return messages
        .map((m) => {
            const chat = chats.find(ch => ch.id === m.chatId);
            const user = chat?.members.find(u =>
                u.username !== m.author)
            if (!user) return m;
            const seen = m.timestamp < user.lastRead;
            return {...m, seen}
        })
}

export const messages = correctSeenMessages(messagesGen);

const mapChatToClient = ({id, members, type}: IChat, username: string): IClientChat => {

    let unreadCount = 0;
    const user = members.find(u => u.username === username);
    const lastRead = user?.lastRead;

    const msgs = getMessagesByChat(id, messages);

    if (lastRead) {
        unreadCount = msgs
            .filter(m => {
                const msg = dayjs(m.timestamp)
                const last = dayjs(lastRead);
                const diff = msg.diff(last, 'minute');
                return diff > 0;
            })
            .length;
    }

    const receiverName = members.find(u => u.username !== username)?.username || '';

    return {
        id,
        title: receiverName,
        lastMessage: msgs.slice(-1)[0],
        unread: unreadCount,
        muted: !!user?.muted,
        type,
        online: users.find(u => u.username === receiverName)?.online
    }
}


export const getChats = (username: string): IClientChat[] => {
    return chats
        .filter(c => !!c.members
            .find(u => u.username === username))
        .map((ch) => mapChatToClient(ch, username))
}

export const updateLastRead = (user: string, message: IMessage) => {
    const chat = chats.find(ch => ch.id === message.chatId)
    if (!chat) return {success: false}
    const searchedUser = chat.members.find(u => u.username === user)
    if (searchedUser) searchedUser.lastRead = message.timestamp;
    return {success: true}
}

export const updateSeen = (username: string, {chatId, timestamp, author}: IMessage) => {
    //if (username === author)
    //     messages
    //         .filter(m => m.chatId === chatId
    //             && m.timestamp <= timestamp
    //             && m.author === author)
    //         .forEach(m => m.seen = true)
}
