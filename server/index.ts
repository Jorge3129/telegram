import {ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData} from "./socket/socket.types";

const express = require('express')
import {Server} from 'socket.io'
import {onConnect} from "./socket/listeners/onConnect";

const cors = require('cors')
const authRouter = require('./routes/auth.router')
const PORT = process.env.PORT || 4000;
const app = express();
const router = require('./routes/router')

app.use(cors({
    origin: "http://localhost:3000",
}))

app.use(express.json())

const server = require('http').createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

app.use('/auth', authRouter)
app.use('/', router)

io.on('connection', onConnect)

server.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`))
