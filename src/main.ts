import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { I18nModule, I18nJsonParser } from 'nestjs-i18n';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  app.useGlobalModules(I18nModule.forRoot({
    fallbackLanguage: 'en',
    parser: I18nJsonParser,
    parserOptions: {
      path: path.join(__dirname, '/i18n/'),
      watch: true,
    },
  }));

  await app.listen(process.env.PORT || 3000);
}

bootstrap();