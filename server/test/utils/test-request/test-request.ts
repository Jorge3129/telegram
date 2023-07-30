import * as supertest from 'supertest';

export type SuperTestRequest = supertest.Test;

export interface TestRequest<TBodyDefault> extends SuperTestRequest {
  getBody<TBody = TBodyDefault>(): Promise<TBody>;
}

export const toTestRequest = <TBody>(
  value: SuperTestRequest,
): TestRequest<TBody> => {
  const valueExtended = value as TestRequest<TBody>;

  valueExtended.getBody = async function (this: SuperTestRequest) {
    return await this.then((result) => result.body);
  };

  return valueExtended;
};
