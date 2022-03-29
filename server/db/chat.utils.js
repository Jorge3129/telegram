"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapChatToClient = void 0;
const dayjs = require('dayjs');
const db_functions_1 = require("./db.functions");
const mapChatToClient = ({ id, members, type, title }, username, users) => {
    let unreadCount = 0;
    const user = members.find(u => u.username === username);
    const lastRead = user?.lastRead;
    const msgs = (0, db_functions_1.getMessagesByChat)(id);
    if (lastRead) {
        unreadCount = msgs
            .filter(m => dayjs(m.timestamp).diff(dayjs(lastRead), 'minute') > 0)
            .length;
    }
    const receiverName = members.find(u => u.username !== username)?.username || '';
    return {
        id,
        title: title || receiverName,
        lastMessage: msgs.slice(-1)[0],
        unread: unreadCount,
        muted: !!user?.muted,
        type,
        //online: users.find(u => u.username === receiverName)?.online
    };
};
exports.mapChatToClient = mapChatToClient;
