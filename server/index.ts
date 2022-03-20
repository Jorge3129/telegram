import {users} from "./db/users";

const express = require('express')
import {Request, Response} from 'express'
import {Server} from 'socket.io'
import {IUser} from "./types/types";
import {chats, getChats} from "./db/chats";
import {getMessages, messages} from "./db/messages";

const cors = require('cors')
const authRouter = require('./routes/auth.router')
const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors({
    origin: "http://localhost:3000",
}))

app.use(express.json())

const server = require('http').createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

app.use('/auth', authRouter)

app.get('/', (req: Request, res: Response) => {
    res.send({foo: 'bar'})
})

app.get('/messages/:chatId', (req: Request, res: Response) => {
    const chatId = parseInt(req.params.chatId);
    //console.log(chatId)
    const messages = getMessages(chatId)
    //console.log(messages)
    res.json(messages)
})

app.get('/chats/:user', (req: Request, res: Response) => {
    const chats = getChats(req.params.user);
    //console.log(chats);
    res.json(chats)
})

app.patch('/lastRead/:chatId/:user', (req: Request, res: Response) => {
    const {chatId, user} = req.params;
    const chat = chats.find(ch => ch.id === parseInt(chatId))
    if (!chat) return res.json({success: false})
    const searchedUser = chat.members.find(u => u.username === user)
    if (searchedUser) searchedUser.lastRead = req.body.lastRead;
    res.json({success: true})
})

io.on('connection', (socket) => {
    console.log('CONNECTED ' + socket.handshake.query.username)

    const user: IUser | undefined = users.find(u =>
        u.username === socket.handshake.query.username);
    if (user) {
        user.online = true;
        user.socketId = socket.id;
    }

    //console.log(users);

    socket.on('message', (data) => {
        console.log(data);
        const {message, receiver} = data;
        const userReceiver = users.find(u =>
            u.username === receiver);
        messages.push(message)
        if (!userReceiver?.socketId) return;
        socket.to(userReceiver.socketId).emit('message-to-client', message)
    })

    socket.on('disconnect', (reason) => {
        console.log(reason)
        if (user) user.online = false;
        console.log(users)
    })
})

server.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`))
