"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const socket_io_1 = require("socket.io");
const onConnect_1 = require("./socket/onConnect");
const cors = require('cors');
const authRouter = require('./routes/auth.router');
const PORT = process.env.PORT || 9000;
const app = express();
const router = require('./routes/router');
const multer = require('multer');
const path = require('path');
app.use(cors({
    origin: ['http://localhost:3000', 'https://telegram-xd.herokuapp.com/'],
}));
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));
const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, 'public/');
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
        console.log(file.originalname);
    },
});
const upload = multer({ storage: storage });
app.get('/media/:filename', (req, res) => {
    const { filename } = req.params;
    res.sendFile(path.resolve('./public/' + filename));
});
app.post('/media', upload.single('file'), (req, res) => {
    console.log(req.body);
    res.json({});
});
const server = require('http').createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
app.use('/auth', authRouter);
app.use('/', router);
io.on('connection', onConnect_1.onConnect);
server.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
