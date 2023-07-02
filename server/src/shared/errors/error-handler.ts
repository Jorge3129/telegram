import { ErrorRequestHandler } from "express";

export const errorHandler =
  (): ErrorRequestHandler => (err, req, res, next) => {
    const status = err.status ?? 500;

    res.status(status).json({
      message: err.message,
      status,
    });
  };
