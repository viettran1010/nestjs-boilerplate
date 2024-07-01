import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Set up global exception handling

  await app.listen(process.env.PORT || 3000);
}
bootstrap();