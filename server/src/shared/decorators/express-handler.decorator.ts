import { NextFunction, Request, RequestHandler, Response } from "express";

export function ExpressHandler(): MethodDecorator {
  return function (
    target: Object,
    propertyName: string | symbol,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const originalMethod = descriptor.value;

    const adjustedDescriptor: PropertyDescriptor = {
      configurable: true,
      get() {
        const boundFn: RequestHandler = async function (
          req: Request,
          res: Response,
          next: NextFunction
        ) {
          // @ts-ignore
          const instance = this as any;

          try {
            await originalMethod.bind(instance)(req, res, next);
          } catch (e) {
            next(e);
          }
        }.bind(this);

        return boundFn;
      },
    };

    return adjustedDescriptor;
  };
}
