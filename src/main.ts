import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { I18nModule, I18nJsonParser } from 'nestjs-i18n';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT || 3000);
}

bootstrap();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();