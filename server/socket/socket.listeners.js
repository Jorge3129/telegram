"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitEvent = exports.onDisconnect = exports.onRead = exports.onMessage = void 0;
const db_functions_1 = require("../db/db.functions");
const { findUserContacts, getUserSocketId } = db_functions_1.User;
const { updateLastRead, getChats } = db_functions_1.Chat;
const { updateSeen, getMessagesByChat } = db_functions_1.Message;
const onMessage = (socket, user) => (data) => {
    const { message } = data;
    db_functions_1.messages.push(message);
    updateLastRead(user?.username || '', message);
    const chat = db_functions_1.chats.find(ch => ch.id === message.chatId);
    if (!chat)
        return;
    chat.members.forEach((member) => {
        (0, exports.emitEvent)(socket, member.username, 'message-to-client', message);
    });
};
exports.onMessage = onMessage;
const onRead = (socket) => (data) => {
    const { message, username } = data;
    updateLastRead(username, message);
    updateSeen(username, message);
    (0, exports.emitEvent)(socket, message.author, 'seen', { message, username });
};
exports.onRead = onRead;
const onDisconnect = (socket, user) => (reason) => {
    if (user) {
        user.online = false;
        user.socketId = undefined;
        findUserContacts(user).forEach(({ username, chatId }) => {
            (0, exports.emitEvent)(socket, username, 'online-change', { online: false, chatId });
        });
    }
};
exports.onDisconnect = onDisconnect;
const emitEvent = (socket, username, id, args) => {
    const socketId = getUserSocketId(username || '');
    socket.to(socketId)
        .emit(id, args);
};
exports.emitEvent = emitEvent;
