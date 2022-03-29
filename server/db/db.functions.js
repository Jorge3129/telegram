"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = exports.Message = exports.getMessagesByChat = exports.User = exports.users = exports.messages = exports.chats = void 0;
const mock_chats_1 = require("../mocks/mock.chats");
const mock_messages_1 = require("../mocks/mock.messages");
const mock_users_1 = require("../mocks/mock.users");
const chat_utils_1 = require("./chat.utils");
exports.chats = mock_chats_1.mockChats;
exports.messages = mock_messages_1.mockMessages;
exports.users = mock_users_1.mockUsers;
const dayjs = require('dayjs');
/* USERS */
const getUserSocketId = (username) => {
    const userReceiver = exports.users.find(u => u.username === username);
    return userReceiver?.socketId || '';
};
const getUserSocketIdQuery = (username) => `
    SELECT socketId
    FROM User
    WHERE username = ${username}
    `;
const findUserContacts = (user) => {
    return exports.chats.filter(ch => ch.members.find(u => u.username === user.username))
        .map(ch => ({
        username: ch.members.find(u => u.username !== user.username)?.username,
        chatId: ch.id
    }));
};
const findUserContactsQuery = (user) => `
    SELECT chatId FROM Chats_Users
    WHERE userId = ${user.id}
    `;
exports.User = { getUserSocketId, findUserContacts };
/* MESSAGES */
const getMessagesByChat = (chatId) => {
    return exports.messages
        .filter(m => m.chatId === chatId)
        .sort((a, b) => (Math.sign(dayjs(a.timestamp).diff(dayjs(b.timestamp), 'millisecond'))));
};
exports.getMessagesByChat = getMessagesByChat;
const updateSeen = (username, { chatId, timestamp, author }) => {
    if (username !== author) {
        exports.messages
            .filter(m => m.chatId === chatId
            && new Date(m.timestamp) <= new Date(timestamp)
            && m.author === author)
            .forEach(m => {
            m.seen = true;
            console.log(m.seenBy);
            if (!m.seenBy)
                m.seenBy = [username];
            if (!m.seenBy.includes(username))
                m.seenBy.push(username);
            console.log(m.seenBy);
        });
    }
};
exports.Message = { getMessagesByChat: exports.getMessagesByChat, updateSeen };
/* CHATS */
const getChats = (username) => {
    return exports.chats
        .filter(c => !!c.members
        .find(u => u.username === username))
        .map((ch) => (0, chat_utils_1.mapChatToClient)(ch, username, exports.users));
};
const updateLastRead = (user, message) => {
    const chat = exports.chats.find(ch => ch.id === message.chatId);
    if (!chat)
        return { success: false };
    const searchedUser = chat.members.find(u => u.username === user);
    if (searchedUser)
        searchedUser.lastRead = message.timestamp;
    return { success: true };
};
exports.Chat = { getChats, updateLastRead };
