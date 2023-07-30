import * as supertest from 'supertest';
import { AppTestingModule } from '../app-testing-module/app-testing-module';

export abstract class BaseTestClient {
  protected testingModule: AppTestingModule;

  protected getHttpServer() {
    return this.testingModule.app.getHttpServer();
  }

  protected request(): supertest.SuperTest<supertest.Test> {
    return supertest(this.getHttpServer());
  }
}
