import {IChat, IClientChat, IMessage, IUser} from "../types/types";
import {mockChats} from "../mocks/mock.chats";
import {mockMessages} from "../mocks/mock.messages";
import {mockUsers} from "../mocks/mock.users";
import {mapChatToClient} from "./chat.utils";

export const chats: IChat[] = mockChats;
export const messages: IMessage[] = mockMessages;
export const users: IUser[] = mockUsers;

const dayjs = require('dayjs')

/* USERS */

const getUserSocketId = (username: string) => {
    const userReceiver = users.find(u =>
        u.username === username);
    return userReceiver?.socketId || '';
}

const getUserSocketIdQuery = (username: string) =>
    `
    SELECT socketId
    FROM User
    WHERE username = ${username}
    `

const findUserContacts = (user: IUser) => {
    return chats.filter(ch => ch.members.find(u => u.username === user.username))
        .map(ch => ({
            username: ch.members.find(u => u.username !== user.username)?.username,
            chatId: ch.id
        }))
}

const findUserContactsQuery = (user: IUser) =>
    `
    SELECT chatId FROM Chats_Users
    WHERE userId = ${user.id}
    `

export const User = {getUserSocketId, findUserContacts}

/* MESSAGES */
export const getMessagesByChat = (chatId: number): IMessage[] => {
    return messages
        .filter(m => m.chatId === chatId)
        .sort((a, b) => (
            Math.sign(dayjs(a.timestamp).diff(dayjs(b.timestamp), 'millisecond'))
        ))
}

const updateSeen = (username: string, {chatId, timestamp, author}: IMessage) => {
    if (username !== author) {
        messages
            .filter(m => m.chatId === chatId
                && new Date(m.timestamp) <= new Date(timestamp)
                && m.author === author)
            .forEach(m => {
                m.seen = true;
                console.log(m.seenBy)
                if (!m.seenBy) m.seenBy = [username]
                if (!m.seenBy.includes(username)) m.seenBy.push(username)
                console.log(m.seenBy)
            })
    }
}

export const Message = {getMessagesByChat, updateSeen}

/* CHATS */

const getChats = (username: string): IClientChat[] => {
    return chats
        .filter(c => !!c.members
            .find(u => u.username === username))
        .map((ch) => mapChatToClient(ch, username, users))
}

const updateLastRead = (user: string, message: IMessage) => {
    const chat = chats.find(ch => ch.id === message.chatId)
    if (!chat) return {success: false}
    const searchedUser = chat.members.find(u => u.username === user)
    if (searchedUser) searchedUser.lastRead = message.timestamp;
    return {success: true}
}


export const Chat = {getChats, updateLastRead}
