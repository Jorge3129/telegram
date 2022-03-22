import {IUser} from "../types/types";

export const users: IUser[] = [
    {
        id: 1,
        username: 'a',
        password: 'a',
        online: false
    },
    {
        id: 2,
        username: 'b',
        password: 'b',
        online: false
    },
    {
        id: 3,
        username: 'c',
        password: 'c',
        online: false
    },
    {
        id: 4,
        username: 'Jim Morrison',
        password: 'a',
        online: false
    },
    {
        id: 5,
        username: 'Paul McCartney',
        password: 'a',
        online: false
    },
];

export const getSocketId = (username: string) => {
    const userReceiver = users.find(u =>
        u.username === username);
    return userReceiver?.socketId || '';
}
