import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import { createServer } from "http";
import { Server } from "socket.io";

import { authRouter } from "./auth/auth.router";
import { chatsRouter } from "./chats/chats.router";
import { socketsGateway } from "./socket/sockets.gateway";
import { seedsService } from "./seeds/seeds-service";
import { uploadsRouter } from "./uploads/uploads.router";
import { userRouter } from "./users/user.router";
import { errorHandler } from "./shared/errors";
import appDataSource from "./data-source";

appDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

const app = express();

const PORT = process.env.PORT || 9000;

app.use(
  cors({
    origin: ["http://localhost:3000", "https://telegram-xd.herokuapp.com"],
  })
);

app.use(express.json());

app.use("/public", express.static(path.join(__dirname, "public")));

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://telegram-xd.herokuapp.com"],
    methods: ["GET", "POST"],
  },
});

app.use("/media", uploadsRouter);
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/", chatsRouter);

app.use(errorHandler());

io.on("connection", socketsGateway.onConnect);

seedsService.seed();

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
