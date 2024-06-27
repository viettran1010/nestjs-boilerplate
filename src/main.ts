import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';

// Assuming AllExceptionsFilter is already implemented and located at /src/filters/all-exceptions.filter.ts
// If not, it should be created following NestJS documentation on exception filters.

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();