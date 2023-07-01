import {IUser} from "../types/types";
import {emitEvent, onDisconnect, onMessage, onRead} from "./socket.listeners";
import {users, User} from '../db/db.functions'

const {findUserContacts, getUserSocketId} = User;

export const onConnect = (socket: any) => {
    console.log('CONNECTED ' + socket.handshake.query.username)

    const user: IUser | undefined = users.find(u =>
        u.username === socket.handshake.query.username);
    if (user) {
        user.online = true;
        user.socketId = socket.id;
        findUserContacts(user).forEach(({username, chatId}) =>
            emitEvent(socket, username, 'online-change', {online: true, chatId})
        )
    }

    socket.on('message', onMessage(socket, user))
    socket.on('read', onRead(socket))
    socket.on('disconnect', onDisconnect(socket, user));
}
