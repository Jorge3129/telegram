import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import path from 'path';
import { createServer } from 'http';
import { Server } from 'socket.io';

import { authRouter } from './auth/auth.router';
import { chatsRouter } from './chats/chats.router';
import { socketsGateway } from './socket/sockets.gateway';
import { uploadsRouter } from './uploads/uploads.router';
import { userRouter } from './users/user.router';
import { errorHandler } from './shared/errors';
import appDataSource from './data-source';
import { authMiddleware } from './auth/auth.middleware';

const app = express();

const PORT = process.env.PORT || 9000;

app.use(
  cors({
    origin: ['http://localhost:3000', 'https://telegram-xd.herokuapp.com'],
  }),
);

app.use(express.json());

app.use('/public', express.static(path.join(__dirname, 'public')));

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'https://telegram-xd.herokuapp.com'],
    methods: ['GET', 'POST'],
  },
});

app.use('/auth', authRouter);
app.use('/media', authMiddleware, uploadsRouter);
app.use('/users', authMiddleware, userRouter);
app.use('/chats', authMiddleware, chatsRouter);

app.use(errorHandler());

io.on('connection', socketsGateway.onConnect);

appDataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
