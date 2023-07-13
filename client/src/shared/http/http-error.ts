const httpErrorType = Symbol("httpError");

export class HttpError<T = unknown> {
  public readonly type = httpErrorType;

  constructor(public readonly status: number, public readonly data: T) {}
}

export const isHttpError = (err: unknown): err is HttpError => {
  return (err as HttpError)?.type === httpErrorType;
};
