"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onConnect = void 0;
const socket_listeners_1 = require("./socket.listeners");
const db_functions_1 = require("../db/db.functions");
const { findUserContacts, getUserSocketId } = db_functions_1.User;
const onConnect = (socket) => {
    console.log('CONNECTED ' + socket.handshake.query.username);
    const user = db_functions_1.users.find(u => u.username === socket.handshake.query.username);
    if (user) {
        user.online = true;
        user.socketId = socket.id;
        findUserContacts(user).forEach(({ username, chatId }) => (0, socket_listeners_1.emitEvent)(socket, username, 'online-change', { online: true, chatId }));
    }
    socket.on('message', (0, socket_listeners_1.onMessage)(socket, user));
    socket.on('read', (0, socket_listeners_1.onRead)(socket));
    socket.on('disconnect', (0, socket_listeners_1.onDisconnect)(socket, user));
};
exports.onConnect = onConnect;
