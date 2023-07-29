import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class AppLoggerService extends ConsoleLogger {
  public error(err: unknown) {
    const error = err as Error;

    super.error(error.message, error.stack, this.context);
  }
}
