import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Set up global exception filter
  app.useGlobalFilters(new AllExceptionsFilter());

  // Set up i18n
  // Removed static assets, views, and view engine setup as they are not supported by default in NestJS
  app.enableCors();
  
  // Initialize i18n

  await app.listen(process.env.PORT || 3000);
}
bootstrap();