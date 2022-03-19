import {IChat, IClientChat} from "../types/types";

const dayjs = require('dayjs')

export const chats: IChat[] = [
    {
        id: 1,
        members: [{username: 'a', unread: 0}, {username: 'b', unread: 0}],
    },
    {
        id: 2,
        members: [{username: 'a', unread: 0}, {username: 'c', unread: 0}],
    },
    {
        id: 3,
        members: [{username: 'b', unread: 0}, {username: 'c', unread: 0}],
    },
    {
        id: 4,
        members: [{username: 'a', unread: 0}, {username: 'Jim Morrison', unread: 0}],
    },
    {
        id: 5,
        members: [{username: 'a', unread: 0}, {username: 'Paul McCartney', unread: 0}],
    },
]

const mapChatToClient = ({id, members}: IChat, username: string): IClientChat => {
    return {
        id,
        title: members.find(u => u.username !== username)?.username || '',
        timestamp: dayjs().format(),
        unread: members.find(u => u.username !== username)?.unread || 0,
    }
}


export const getChats = (username: string): IClientChat[] => {
    return chats
        .filter(c => !!c.members
            .find(u => u.username === username))
        .map((ch) => mapChatToClient(ch, username))
}
