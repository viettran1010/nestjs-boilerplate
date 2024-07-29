import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
// Import custom exception filters if any
// import { CustomExceptionFilter } from './filters/custom-exception.filter';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  // app.useGlobalFilters(new CustomExceptionFilter());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();