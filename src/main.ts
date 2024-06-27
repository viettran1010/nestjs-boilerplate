import { NestFactory } from '@nestjs/core';
import { AllExceptionsFilter } from './filters/all-exceptions.filter'; // This import remains unchanged
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter()); // This line remains unchanged
  await app.listen(process.env.PORT || 3000);
}
bootstrap(); // This line remains unchanged