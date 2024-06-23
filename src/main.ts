import { NestFactory } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.PORT || 3000);
}

bootstrap();

// HttpExceptionFilter implementation (assuming it's in a separate file like ./filters/http-exception.filter.ts)
// This is a placeholder and should be replaced with the actual implementation
export class HttpExceptionFilter {}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();