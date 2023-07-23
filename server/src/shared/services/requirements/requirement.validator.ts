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
    defaultError: (message?: string) => Error,
  ): Promise<void> {
    for (const { check, err, errMessage } of requirements) {
      const success = await this.getCheckResult(check);

      if (!success) {
        throw this.getError(err, errMessage, defaultError);
      }
    }
  }

  private async getCheckResult(check: RequirementCheck): Promise<boolean> {
    if (typeof check === 'function') {
      return await check();
    }

    return check;
  }

  private getError(
    err: RequirementError | undefined,
    errMessage: string | undefined,
    defaultError: (message?: string) => Error,
  ): Error {
    if (!err) {
      return defaultError(errMessage);
    }

    if (typeof err === 'function') {
      return err(errMessage);
    }

    return err;
  }
}
