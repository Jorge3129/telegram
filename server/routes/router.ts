import {Request, Response, Router} from "express";
import {Message, Chat} from "../db/db.functions";

const {getMessagesByChat} = Message;
const {getChats} = Chat;

const express = require('express')
const router: Router = express.Router();

router.get('/messages/:chatId', (req: Request, res: Response) => {
    const chatId = parseInt(req.params.chatId);
    const messages = getMessagesByChat(chatId)
    res.json(messages)
})

router.get('/chats/:user', (req: Request, res: Response) => {
    const chats = getChats(req.params.user);
    res.json(chats)
})

module.exports = router
