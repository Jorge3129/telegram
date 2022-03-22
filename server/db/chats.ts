import {IChat, IClientChat} from "../types/types";
import {getMessages} from "./messages";
import {chats as chatsTemp} from "./chatsTemp";
import {users} from "./users";

const dayjs = require('dayjs')

export const chats: IChat[] = chatsTemp

const mapChatToClient = ({id, members, type}: IChat, username: string): IClientChat => {

    let unreadCount = 0;
    const user = members.find(u => u.username === username);
    const lastRead = user?.lastRead;

    const messages = getMessages(id);

    if (lastRead) {
        unreadCount = messages
            .filter(m => {
                const msg = dayjs(m.timestamp)
                const last = dayjs(lastRead);
                const diff = msg.diff(last, 'minute');
                return diff > 0;
            })
            .length;
    }

    //console.log('Unread: ' + unreadCount)
    const receiverName = members.find(u => u.username !== username)?.username || '';

    return {
        id,
        title: receiverName,
        lastMessage: messages.slice(-1)[0],
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

export const updateLastRead = (chatId: number, user: string, lastRead: string) => {
    const chat = chats.find(ch => ch.id === chatId)
    if (!chat) return {success: false}
    const searchedUser = chat.members.find(u => u.username === user)
    if (searchedUser) searchedUser.lastRead = lastRead;
    return {success: true}
}
