import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter'; // Corrected path

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Assuming AllExceptionsFilter is implemented in the following path
  // This import should be adjusted according to the actual file location
  // import { AllExceptionsFilter } from './filters/all-exceptions.filter';
  app.useGlobalFilters(new AllExceptionsFilter()); // Set up a global filter for exception handling
  await app.listen(process.env.PORT || 3000);
}
bootstrap();