import { NestFactory } from '@nestjs/core';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter()); // Set up a global filter for exception handling
  await app.listen(process.env.PORT || 3000);
}
bootstrap();