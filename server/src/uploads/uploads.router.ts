import { Router } from "express";
import multer from "multer";
import { Request } from "express";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

import path from "path";

export const uploadsRouter = Router();

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

uploadsRouter.get("/:filename", (req, res) => {
  const { filename } = req.params;
  res.sendFile(path.resolve("./public/" + filename));
});

uploadsRouter.post("/", upload.single("file"), (req, res) => {
  res.json({});
});
