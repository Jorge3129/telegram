import { Injectable } from '@nestjs/common';
import {
  RequirementCheck,
  RequirementConfig,
  RequirementError,
} from './requirement-config';

@Injectable()
export class RequirementValidator {
  public async validate(
    requirements: RequirementConfig[],
    defaultError: (message: string) => Error,
  ): Promise<void> {
    for (const { check, err } of requirements) {
      const success = await this.getCheckResult(check);

      if (!success) {
        throw this.getError(this.getErrorValue(err), defaultError);
      }
    }
  }

  private async getCheckResult(check: RequirementCheck): Promise<boolean> {
    if (typeof check === 'function') {
      return await check();
    }

    return check;
  }

  private getErrorValue(error: RequirementError): Error | string {
    if (typeof error === 'function') {
      return error();
    }

    return error;
  }

  private getError(
    err: Error | string,
    defaultError: (message: string) => Error,
  ): Error {
    if (typeof err === 'string') {
      return defaultError(err);
    }

    return err;
  }
}
