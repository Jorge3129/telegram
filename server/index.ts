import {getSocketId, users} from "./db/users";

const express = require('express')
import {Request, Response} from 'express'
import {Server} from 'socket.io'
import {IUser} from "./types/types";
import {chats, getChats, updateLastRead} from "./db/chats";
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
    const messages = getMessages(chatId)
    res.json(messages)
})

app.get('/chats/:user', (req: Request, res: Response) => {
    const chats = getChats(req.params.user);
    res.json(chats)
})

const findContacts = (user: IUser) => {
    return chats.filter(ch => ch.members.find(u => u.username === user.username))
        .map(ch => ({
            username: ch.members.find(u => u.username !== user.username)?.username,
            chatId: ch.id
        }))
}

io.on('connection', (socket) => {
    console.log('CONNECTED ' + socket.handshake.query.username)

    const user: IUser | undefined = users.find(u =>
        u.username === socket.handshake.query.username);
    if (user) {
        user.online = true;
        user.socketId = socket.id;
        findContacts(user).forEach(({username, chatId}) => {
            const socketId = getSocketId(username|| '')
            //console.log(socketId)
            socket.to(socketId)
                .emit('online-change', {online: true, chatId})
        })
    }

    socket.on('message', (data) => {
        const {message} = data;
        messages.push(message);
        updateLastRead(message.chatId, user?.username || '', message.timestamp);
        const chat = chats.find(ch => ch.id === message.chatId);
        if (!chat) return;
        chat.members.forEach((member) => {
            const socketId = getSocketId(member.username)
            //console.log(socketId)
            socket.to(socketId)
                .emit('message-to-client', message)
        })
    })

    socket.on('read', (data) => {
        const {message, username} = data;
        updateLastRead(message.chatId, username, message.timestamp)
    })

    socket.on('disconnect', (reason) => {
        if (user) {
            user.online = false;
            user.socketId = undefined;
            findContacts(user).forEach(({username, chatId}) => {
                const socketId = getSocketId(username || '')
                //console.log(socketId)
                socket.to(socketId)
                    .emit('online-change', {online: false, chatId})
            })
        }
        //console.log(users)
    });

})

server.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`))
