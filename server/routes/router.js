"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_functions_1 = require("../db/db.functions");
const { getMessagesByChat } = db_functions_1.Message;
const { getChats } = db_functions_1.Chat;
const express = require('express');
const router = express.Router();
router.get('/messages/:chatId', (req, res) => {
    const chatId = parseInt(req.params.chatId);
    const messages = getMessagesByChat(chatId);
    res.json(messages);
});
router.get('/chats/:user', (req, res) => {
    const chats = getChats(req.params.user);
    res.json(chats);
});
module.exports = router;
