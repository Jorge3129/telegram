import {IChat, IClientChat} from "../types/types";
import {getMessages} from "./messages";

const dayjs = require('dayjs')

export const chats: IChat[] = [
    {
        id: 1,
        members: [
            {username: 'a', lastRead: '2022-03-13T10:16:35+02:00', muted: false},
            {username: 'b', lastRead: '2011-10-05T14:48:00+02:00', muted: true}
        ],
    },
    {
        id: 2,
        members: [
            {username: 'a', lastRead: '2022-03-20T13:16:35+02:00', muted: true},
            {username: 'c', lastRead: '2011-10-05T14:48:00+02:00', muted: true}
        ],
    },
    {
        id: 3,
        members: [
            {username: 'b', lastRead: '2022-03-15T09:16:35+02:00', muted: true},
            {username: 'c', lastRead: '2011-10-05T14:48:00+02:00', muted: true}
        ],
    },
    {
        id: 4,
        members: [
            {username: 'a', lastRead: '2022-03-18T08:16:35+02:00', muted: true},
            {username: 'Jim Morrison', lastRead: '2011-10-05T14:48:00+02:00', muted: true}
        ],
    },
    {
        id: 5,
        members: [
            {username: 'a', lastRead: '2022-03-20T07:16:35+02:00', muted: true},
            {username: 'Paul McCartney', lastRead: '2011-10-05T14:48:00+02:00', muted: true}
        ],
    },
]

const mapChatToClient = ({id, members}: IChat, username: string): IClientChat => {

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
                return diff >= 0;
            })
            .length;
    }

    console.log('Unread: ' + unreadCount)

    return {
        id,
        title: members.find(u => u.username !== username)?.username || '',
        lastMessage: messages.slice(-1)[0],
        unread: unreadCount,
        muted: !!user?.muted
    }
}


export const getChats = (username: string): IClientChat[] => {
    return chats
        .filter(c => !!c.members
            .find(u => u.username === username))
        .map((ch) => mapChatToClient(ch, username))
}
