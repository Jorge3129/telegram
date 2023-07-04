import { NextFunction, Request, RequestHandler, Response } from 'express';

export function SocketEventHandler(): MethodDecorator {
  return function (
    target: Object,
    propertyName: string | symbol,
    descriptor: PropertyDescriptor,
  ): PropertyDescriptor {
    const originalMethod = descriptor.value as Function;

    const adjustedDescriptor: PropertyDescriptor = {
      configurable: true,
      get() {
        const boundFn = async function (...args: any[]) {
          // @ts-ignore
          const instance = this as any;

          const ackFunction = args.at(-1);

          try {
            console.log(originalMethod.name.toUpperCase());
            const returnValue = await originalMethod.bind(instance)(...args);

            if (typeof ackFunction === 'function') {
              ackFunction(returnValue);
            }

            return returnValue;
          } catch (e) {
            throw e;
          }
        }.bind(this);

        return boundFn;
      },
    };

    return adjustedDescriptor;
  };
}
