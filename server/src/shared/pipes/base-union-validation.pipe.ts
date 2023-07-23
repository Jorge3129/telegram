import { PipeTransform, UnprocessableEntityException } from '@nestjs/common';
import { ValidationError, validate } from 'class-validator';

export abstract class BaseUnionValidationPipe<
  TInput extends object,
  TResult extends object = TInput,
> implements PipeTransform
{
  public async transform(payload: TInput): Promise<TResult> {
    const instance = await this.createInstance(payload);

    const errors = await validate(instance, {
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    });

    if (errors.length) {
      console.log(errors.map((er) => er.children));

      const errorMessage = errors
        .map((error) => this.formatError(error))
        .join(', ');

      throw new UnprocessableEntityException(
        `Validation failed: ${errorMessage}`,
      );
    }

    return instance;
  }

  private formatError(error: ValidationError): string[] {
    const ownConstraints = Object.values(error.constraints ?? {});

    const childConstraints = (error.children ?? []).map((child) =>
      this.formatError(child),
    );

    return [ownConstraints, ...childConstraints].flat();
  }

  protected abstract createInstance(payload: TInput): Promise<TResult>;
}
