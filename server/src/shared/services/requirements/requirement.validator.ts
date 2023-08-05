import { Injectable } from '@nestjs/common';
import {
  RequirementCheck,
  RequirementConfig,
  RequirementError,
  isNegativeRequirement,
} from './requirement-config';

@Injectable()
export class RequirementValidator {
  public async validate(
    requirements: RequirementConfig[],
    defaultError: (message?: string) => Error,
  ): Promise<void> {
    for (const requirement of requirements) {
      const success = await this.getRequirementResult(requirement);

      if (!success) {
        const { err, errMessage } = requirement;

        throw this.getError(err, errMessage, defaultError);
      }
    }
  }

  private async getRequirementResult(req: RequirementConfig): Promise<boolean> {
    if (isNegativeRequirement(req)) {
      const result = await this.getCheckResult(req.checkNot);

      return !result;
    }

    return await this.getCheckResult(req.check);
  }

  private async getCheckResult(check: RequirementCheck) {
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
