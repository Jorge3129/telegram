import {IUser} from "../../types/types";
import {getUserSocketId, users} from "../../db/mock.users";
import {findUserContacts} from "./socket.utils";
import {onDisconnect, onMessage, onRead} from "./socket.listeners";

export const onConnect = (socket: any) => {
    console.log('CONNECTED ' + socket.handshake.query.username)

    const user: IUser | undefined = users.find(u =>
        u.username === socket.handshake.query.username);
    if (user) {
        user.online = true;
        user.socketId = socket.id;
        findUserContacts(user).forEach(({username, chatId}) => {
            const socketId = getUserSocketId(username || '')
            //console.log(socketId)
            socket.to(socketId)
                .emit('online-change', {online: true, chatId})
        })
    }

    socket.on('message', onMessage(socket, user))
    socket.on('read', onRead(socket))
    socket.on('disconnect', onDisconnect(socket, user));
}
