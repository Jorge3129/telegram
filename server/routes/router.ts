import {Request, Response, Router} from "express";
import {getMessages} from "../db/messages";
import {getChats} from "../db/chats";

const express = require('express')
const router: Router = express.Router();

router.get('/messages/:chatId', (req: Request, res: Response) => {
    const chatId = parseInt(req.params.chatId);
    const messages = getMessages(chatId)
    res.json(messages)
})

router.get('/chats/:user', (req: Request, res: Response) => {
    const chats = getChats(req.params.user);
    res.json(chats)
})

module.exports = router
