import {ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData} from "./socket/socket.types";

const express = require('express')
import {Server} from 'socket.io'
import {onConnect} from "./socket/onConnect";
import {request, Request, Response} from "express"

const cors = require('cors')
const authRouter = require('./routes/auth.router')
const PORT = process.env.PORT || 9000;
const app = express();
const router = require('./routes/router')
const multer = require('multer')
import {FileFilterCallback} from 'multer'

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

app.use(cors({
    origin: "http://localhost:3000",
}))

app.use(express.json())

const storage = multer.diskStorage({
    destination: (request: Request, file: Express.Multer.File, callback: DestinationCallback) => {
        callback(null, 'images/')
        console.log(file)
    },
    filename: (req: Request, file: Express.Multer.File, callback: FileNameCallback) => {
        callback(null, file.originalname)
    },
})

const upload = multer({storage: storage})

app.post('/image', upload.single('file'),
    (req: Request, res: Response) => {
        console.log(req.body)
        res.json({})
    }
)

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
