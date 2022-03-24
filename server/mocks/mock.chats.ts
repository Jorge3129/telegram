import {IChat} from "../types/types";

const mockChats: IChat[] = [
    {
        id: 1,
        members: [
            {username: 'a', lastRead: '2022-03-13T10:16:35+02:00', muted: false},
            {username: 'b', lastRead: '2011-10-05T14:48:00+02:00', muted: true}
        ],
        type: 'personal',
    },
    {
        id: 2,
        members: [
            {username: 'a', lastRead: '2022-03-13T10:16:35+02:00', muted: false},
            {username: 'c', lastRead: '2011-10-05T14:48:00+02:00', muted: true}
        ],
        type: 'personal',
    },
    {
        id: 3,
        members: [
            {username: 'b', lastRead: '2022-03-13T10:16:35+02:00', muted: false},
            {username: 'c', lastRead: '2011-10-05T14:48:00+02:00', muted: true}
        ],
        type: 'personal',
    },
    {
        id: 4,
        members: [
            {username: 'a', lastRead: '2022-03-13T10:16:35+02:00', muted: false},
            {username: 'Jim Morrison', lastRead: '2011-10-05T14:48:00+02:00', muted: true}
        ],
        type: 'personal',
    },
    {
        id: 5,
        members: [
            {username: 'a', lastRead: '2022-03-13T10:16:35+02:00', muted: false},
            {username: 'Paul McCartney', lastRead: '2011-10-05T14:48:00+02:00', muted: true}
        ],
        type: 'personal',
    },
    {
        id: 11,
        members: [
            {username: 'b', lastRead: '2022-03-13T10:16:35+02:00', muted: false},
            {username: 'Jim Morrison', lastRead: '2011-10-05T14:48:00+02:00', muted: true}
        ],
        type: 'personal',
    },
    {
        id: 12,
        members: [
            {username: 'b', lastRead: '2022-03-13T10:16:35+02:00', muted: false},
            {username: 'Paul McCartney', lastRead: '2011-10-05T14:48:00+02:00', muted: true}
        ],
        type: 'personal',
    },
    {
        id: 13,
        members: [
            {username: 'c', lastRead: '2022-03-13T10:16:35+02:00', muted: false},
            {username: 'Jim Morrison', lastRead: '2011-10-05T14:48:00+02:00', muted: true}
        ],
        type: 'personal',
    },
    {
        id: 14,
        members: [
            {username: 'c', lastRead: '2022-03-13T10:16:35+02:00', muted: false},
            {username: 'Paul McCartney', lastRead: '2011-10-05T14:48:00+02:00', muted: true}
        ],
        type: 'personal',
    },
    {
        id: 15,
        members: [
            {username: 'Jim Morrison', lastRead: '2022-03-13T10:16:35+02:00', muted: false},
            {username: 'Paul McCartney', lastRead: '2011-10-05T14:48:00+02:00', muted: true}
        ],
        type: 'personal',
    },
]
