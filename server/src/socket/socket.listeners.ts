import {IMessage, IUser} from "../types/types";
import {Socket} from "socket.io";
import {chats, messages, users, User, Chat, Message} from "../db/db.functions"

const {findUserContacts, getUserSocketId} = User;
const {updateLastRead, getChats} = Chat;
const {updateSeen, getMessagesByChat} = Message;

export const onMessage = (socket: Socket, user: IUser | undefined) => (data: any) => {
    const {message} = data;
    messages.push(message);
    updateLastRead(user?.username || '', message);
    const chat = chats.find(ch => ch.id === message.chatId);
    if (!chat) return;
    chat.members.forEach((member) => {
        emitEvent(socket, member.username, 'message-to-client', message);
    })
}

export const onRead = (socket: Socket) => (data: any) => {
    const {message, username} = data;
    updateLastRead(username, message)
    updateSeen(username, message);
    emitEvent(socket, message.author,'seen', {message, username})
}

export const onDisconnect = (socket: Socket, user: IUser | undefined) => (reason: any) => {
    if (user) {
        user.online = false;
        user.socketId = undefined;
        findUserContacts(user).forEach(({username, chatId}) => {
            emitEvent(socket, username, 'online-change', {online: false, chatId})
        })
    }
}

export const emitEvent = (socket: Socket, username: string | undefined, id: string, args: any) => {
    const socketId = getUserSocketId(username || '')
    socket.to(socketId)
        .emit(id, args)
}
