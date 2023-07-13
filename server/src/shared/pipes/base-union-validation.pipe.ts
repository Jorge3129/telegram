import { PipeTransform, UnprocessableEntityException } from '@nestjs/common';
import { validate } from 'class-validator';

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
      const errorMessage = errors.map((error) => error.constraints).join(',');

      throw new UnprocessableEntityException(
        `Validation failed: ${errorMessage}`,
      );
    }

    return instance;
  }

  protected abstract createInstance(payload: TInput): Promise<TResult>;
}
