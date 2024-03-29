import { ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../../src/app.module';
import { AppTestingModule } from './app-testing-module';
import { MockAuthGuard } from '../mocks/mock-auth.guard';
import { AuthGuard } from '../../../src/auth/auth.guard';
import { AppEventEmitter } from '../../../src/shared/services/app-event-emitter.service';

export class AppTestingModuleFactory {
  public async create(): Promise<AppTestingModule> {
    const moduleBuilder = Test.createTestingModule({
      imports: [AppModule],
    });

    const module = await moduleBuilder
      .overrideProvider(AuthGuard)
      .useClass(MockAuthGuard)
      .overrideProvider(AppEventEmitter)
      .useValue({
        emit: jest.fn(),
      })
      .compile();

    const app = module.createNestApplication();

    app.useGlobalPipes(new ValidationPipe());

    await app.init();

    return new AppTestingModule(app);
  }
}

export const testingModuleFactory = new AppTestingModuleFactory();
