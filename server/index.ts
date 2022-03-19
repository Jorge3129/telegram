import {users} from "./db/users";
const express = require('express')
import {Request, Response} from 'express'
import {Server} from 'socket.io'
import {IUser} from "./types/types";
import {getChats} from "./db/chats";
import {getMessages} from "./db/messages";

const cors = require('cors')
const authRouter = require('./routes/auth.router')
const PORT = process.env.PORT || 5000;
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
    console.log(chatId)
    const messages = getMessages(chatId)
    console.log(messages)
    res.json(messages)
})

app.get('/chats/:user', (req: Request, res: Response) => {
    const chats = getChats(req.params.user);
    console.log(chats);
    res.json(chats)
})

io.on('connection', (socket) => {
    console.log('CONNECTED ' + socket.handshake.query.username)

    const user: IUser | undefined = users.find(u =>
        u.username === socket.handshake.query.username);
    if (user) {
        user.online = true;
        user.id = socket.id;
    }

    console.log(users);

    socket.on('message', (data) => {
        console.log(data);
        const {message, receiver} = data;
        const userReceiver = users.find(u =>
            u.username === receiver);
        if (!userReceiver?.id) return;
        socket.to(userReceiver.id).emit('message-to-client', {message, author: user})
    })

    socket.on('disconnect', (reason) => {
        console.log(reason)
        if (user) user.online = false;
        console.log(users)
    })
})

server.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`))
