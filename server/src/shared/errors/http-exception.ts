export class HttpException extends Error {
  constructor(public readonly message: string, public readonly status: number) {
    super();
  }
}

export const isHttpException = (err: unknown): err is HttpException => {
  return err instanceof HttpException;
};
