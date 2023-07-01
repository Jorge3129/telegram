import express from "express";
import { NextFunction, Request, Response } from "express";
import cors from "cors";
import multer from "multer";
import path from "path";

import { Server } from "socket.io";
import { onConnect } from "./socket/onConnect";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "./socket/socket.types";

import { authRouter } from "./routes/auth.router";
import { chatsRouter } from "./routes/chats.router";

const app = express();

const PORT = process.env.PORT || 9000;

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

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

const storage = multer.diskStorage({
  destination: (
    request: Request,
    file: Express.Multer.File,
    callback: DestinationCallback
  ) => {
    callback(null, "public/");
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    callback: FileNameCallback
  ) => {
    callback(null, file.originalname);
    console.log(file.originalname);
  },
});

const upload = multer({ storage: storage });

app.get("/media/:filename", (req: Request, res: Response) => {
  const { filename } = req.params;
  res.sendFile(path.resolve("./public/" + filename));
});

app.post("/media", upload.single("file"), (req: Request, res: Response) => {
  console.log("POST!!!");
  res.json({});
});

const server = require("http").createServer(app);
const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, {
  cors: {
    origin: ["http://localhost:3000", "https://telegram-xd.herokuapp.com"],
    methods: ["GET", "POST"],
  },
});

app.use("/auth", authRouter);
app.use("/", chatsRouter);

io.on("connection", onConnect);

server.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
