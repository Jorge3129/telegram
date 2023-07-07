export function CatchError(): MethodDecorator {
  return function (
    target: object,
    propertyName: string | symbol,
    descriptor: PropertyDescriptor,
  ): PropertyDescriptor {
    const originalMethod = descriptor.value as (...args: any[]) => any;

    descriptor.value = async function (...args: any[]) {
      try {
        const result = await originalMethod.apply(this, args);

        return result;
      } catch (e) {
        console.log(e);
      }
    };

    return descriptor;
  };
}
