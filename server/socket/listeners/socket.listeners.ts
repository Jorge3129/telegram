import {messages} from "../../db/chats";
import {chats, updateLastRead, updateSeen} from "../../db/chats";
import {getUserSocketId, users} from "../../db/mock.users";
import {IMessage, IUser} from "../../types/types";
import {Socket} from "socket.io";
import {findUserContacts} from "./socket.utils";

export const onMessage = (socket: Socket, user: IUser | undefined) => (data: any) => {
    const {message} = data;
    messages.push(message);
    updateLastRead(user?.username || '', message);
    const chat = chats.find(ch => ch.id === message.chatId);
    if (!chat) return;
    chat.members.forEach((member) => {
        const socketId = getUserSocketId(member.username)
        //console.log(socketId)
        socket.to(socketId)
            .emit('message-to-client', message)
    })
}

export const onRead = (socket: Socket) => (data: any) => {
    const {message, username} = data;
    updateLastRead(username, message)
    updateSeen(username, message);
    const socketId = getUserSocketId(message.author)
    socket.to(socketId)
        .emit('seen', message, username)
}

export const onDisconnect = (socket: Socket, user: IUser | undefined) => (reason: any) => {
    if (user) {
        user.online = false;
        user.socketId = undefined;
        findUserContacts(user).forEach(({username, chatId}) => {
            const socketId = getUserSocketId(username || '')
            socket.to(socketId)
                .emit('online-change', {online: false, chatId})
        })
    }
}
