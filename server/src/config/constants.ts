import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({
  path: path.resolve(process.cwd(), `env.${process.env.NODE_ENV}.env`),
});

export const ACCESS_TOKEN_EXPIRATION_TIME = '7d';
export const REFRESH_TOKEN_EXPIRATION_TIME = '7d';
export const SECRET_KEY = process.env.JWT_SECRET as string;
