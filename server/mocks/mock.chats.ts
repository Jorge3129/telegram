import {IChat, IGroupChat, IPersonalChat} from '../types/types';

export const mockChats: (IPersonalChat | IGroupChat)[] = [
    {
        id: 1,
        members: [
            {username: 'a', lastRead: '2022-03-19T05:20:46+02:00', muted: false},
            {username: 'b', lastRead: '2022-03-19T05:50:46+02:00', muted: true}
        ],
        type: 'personal'
    },
    {
        id: 2,
        members: [
            {username: 'a', lastRead: '2022-03-20T15:10:46+02:00', muted: true},
            {username: 'c', lastRead: '2022-03-20T14:40:46+02:00', muted: true}
        ],
        type: 'personal'
    },
    {
        id: 3, members:
            [
                {username: 'b', lastRead: '2022-03-22T00:00:46+02:00', muted: true},
                {username: 'c', lastRead: '2022-03-22T00:30:46+02:00', muted: true}
            ],
        type: 'personal'
    },
    {
        id: 4,
        members: [
            {username: 'a', lastRead: '2022-03-23T09:50:46+02:00', muted: true},
            {username: 'Jim Morrison', lastRead: '2022-03-23T09:20:46+02:00', muted: true}
        ],
        type: 'personal'
    },
    {
        id: 5,
        members: [
            {username: 'a', lastRead: '2022-03-24T18:10:46+02:00', muted: true},
            {username: 'Paul McCartney', lastRead: '2022-03-24T19:10:46+02:00', muted: true}
        ],
        type: 'personal',
    },
    {
        id: 16,
        members: [
            {username: 'a', lastRead: '2022-03-24T18:10:46+02:00', muted: true},
            {username: 'b', lastRead: '2022-03-24T19:10:46+02:00', muted: true},
            {username: 'Paul McCartney', lastRead: '2022-03-24T19:10:46+02:00', muted: true}
        ],
        type: 'group',
        title: 'Глисти із жопи'
    },
    {
        id: 11,
        members: [
            {username: 'b', lastRead: '2022-03-13T10:16:35+02:00', muted: false},
            {username: 'Jim Morrison', lastRead: '2011-10-05T14:48:00+02:00', muted: true}
        ],
        type: 'personal'
    },
    {
        id: 12,
        members: [
            {username: 'b', lastRead: '2022-03-13T10:16:35+02:00', muted: false},
            {username: 'Paul McCartney', lastRead: '2011-10-05T14:48:00+02:00', muted: true}
        ],
        type: 'personal'
    },
    {
        id: 13,
        members: [
            {username: 'c', lastRead: '2022-03-13T10:16:35+02:00', muted: false},
            {username: 'Jim Morrison', lastRead: '2011-10-05T14:48:00+02:00', muted: true}
        ],
        type: 'personal'
    },
    {
        id: 14,
        members: [
            {username: 'c', lastRead: '2022-03-13T10:16:35+02:00', muted: false},
            {username: 'Paul McCartney', lastRead: '2011-10-05T14:48:00+02:00', muted: true}
        ],
        type: 'personal'
    },
    {
        id: 15,
        members: [
            {username: 'Jim Morrison', lastRead: '2022-03-13T10:16:35+02:00', muted: false},
            {username: 'Paul McCartney', lastRead: '2011-10-05T14:48:00+02:00', muted: true}
        ],
        type: 'personal'
    }]

