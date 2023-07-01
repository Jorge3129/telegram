import express from "express";
import cors from "cors";
import path from "path";

import { Server } from "socket.io";
import { authRouter } from "./routes/auth.router";
import { chatsRouter } from "./routes/chats.router";
import { socketsGateway } from "./socket/sockets.gateway";
import { seedsService } from "./seeds/seeds-service";
import { uploadsRouter } from "./uploads/uploads.router";

const app = express();

const PORT = process.env.PORT || 9000;

app.use(
  cors({
    origin: ["http://localhost:3000", "https://telegram-xd.herokuapp.com"],
  })
);

app.use(express.json());

const fs = require("fs");
const dir = "./public";

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/media", uploadsRouter);

const server = require("http").createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://telegram-xd.herokuapp.com"],
    methods: ["GET", "POST"],
  },
});

app.use("/auth", authRouter);
app.use("/", chatsRouter);

io.on("connection", socketsGateway.onConnect);

seedsService.seed();

server.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
