import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { jwtMiddleware } from './auth/jwt.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(jwtMiddleware); // Apply global middleware for JWT token checking
  await app.listen(process.env.PORT || 3000);
}

bootstrap();