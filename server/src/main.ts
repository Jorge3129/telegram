import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './swagger';
import { ConfigService } from '@nestjs/config';
import { NodeEnv } from './shared/enums/node-env.enum';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  if (configService.get<string>('NODE_ENV') === NodeEnv.DEV) {
    setupSwagger(app);
  }

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.enableCors();

  await app.listen(process.env.PORT || 9000);
}
bootstrap();
